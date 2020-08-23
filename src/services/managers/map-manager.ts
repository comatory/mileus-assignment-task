import mapboxgl, {
  LngLat,
  Map,
  Marker,
  MapMouseEvent,
  GeolocateControl,
} from 'mapbox-gl'

import RouteActions from '../actions/route-actions'
import RouteUtils from '../../utils/route-utils'
import { IRouteRetriever } from '../../interfaces/retrievers'
import { IRouteStore } from '../../interfaces/stores'
import { Route } from '../../interfaces/route'
import { IMapFactory } from '../../interfaces/map'
import { IMapManager } from '../../interfaces/managers'
import GraphActions from '../actions/graph-actions'
import GraphUtils from '../../utils/graph-utils'
import { ACTIVE_ROUTE } from '../../constants'

interface Markers {
  origin: Marker | null,
  destination: Marker | null,
}

export default class MapManager implements IMapManager {
  private _map: Map | null = null
  private _markers: Markers = {
    origin: null,
    destination: null,
  }
  private _graphActions: GraphActions
  private _mapFactory: IMapFactory
  private _routeActions: RouteActions
  private _routeRetriever: IRouteRetriever
  private _routeStore: IRouteStore

  constructor(services: {
    graphActions: GraphActions,
    mapFactory: IMapFactory,
    routeActions: RouteActions,
    routeRetriever: IRouteRetriever,
    routeStore: IRouteStore,
  }) {
    this._graphActions = services.graphActions
    this._mapFactory = services.mapFactory
    this._routeActions = services.routeActions
    this._routeRetriever = services.routeRetriever
    this._routeStore = services.routeStore
  }

  public initialize(token: string) {
    mapboxgl.accessToken = token
  }

  public createMap(node: HTMLElement) {
    this._map = this._mapFactory({
      container: node.id,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ 14.422235843328906, 50.08298059442754 ],
      zoom: 18,
    })

    const map = this._map

    this._attachListeners(map)

    // NOTE: Might not work in Chromium, works fine in Chrome / FF
    map.addControl(new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }))
  }

  public removeMap() {
    if (!this._map) {
      console.warn('MapManager#removeMap -> Attempting to remove non-existing map!')
      return
    }

    this._map.remove()
  }

  _attachListeners(map: Map) {
    map.on('click', (e: MapMouseEvent) => this._handleClick(e, map))
  }

  public addOriginMarker(lngLat: LngLat, moveMap: boolean = false) {
    if (!this._map) {
      console.warn('MapManager#addOriginMarker -> Missing Map instance')
      return
    }

    this._addMarker(this._map, 'origin', lngLat, {
      moveMap
    })

    this._routeActions.clearRouteRequestError()
    this._routeActions.setOrigin(lngLat)
  }

  public addDestinationMarker(lngLat: LngLat, moveMap: boolean = false) {
    if (!this._map) {
      console.warn('MapManager#addDestinationMarker -> Missing Map instance')
      return
    }

    this._addMarker(this._map, 'destination', lngLat, {
      moveMap,
    })

    this._routeActions.clearRouteRequestError()
    this._routeActions.setDestination(lngLat)
  }

  public async findRoute(origin: LngLat, destination: LngLat) {
    this._routeActions.startRouteRequest()

    try {
      const routes = await this._routeRetriever.fetchRoute(origin, destination)
      this._routeActions.setRoutes(routes)

      // NOTE: The app would eventually support multiple routes but for simplicity
      //       (and I also have limited time) I decided to deal with single routes
      //       and single leg of journey)
      const route = routes[ACTIVE_ROUTE]
      this._drawRoute(route, this._map)

      const graphData = GraphUtils.createGraph(route)
      this._graphActions.setData(graphData)
    } catch (err) {
      this._routeActions.setRouteRequestError(err)
    }

    this._routeActions.stopRouteRequest()
  }

  public moveToOrigin() {
    const originMarker = this._markers['origin']

    if (!originMarker) {
      return
    }

    const lngLat = originMarker.getLngLat()
    this._moveToLngLat(lngLat)
  }

  public moveToDestination() {
    const destinationMarker = this._markers['destination']

    if (!destinationMarker) {
      return
    }

    const lngLat = destinationMarker.getLngLat()
    this._moveToLngLat(lngLat)
  }

  private _moveToLngLat(lngLat: LngLat) {
    const map = this._map
    if (!map) {
      return
    }

    map.flyTo({
      center: [ lngLat.lng, lngLat.lat ],
      zoom: 14,
    })
  }

  private _addMarker(
    map: Map,
    markerId: string,
    lngLat: LngLat,
    options: Partial<{ moveMap: boolean }> = {}
  ) {
    this._clearMarker(markerId)

    this._markers[markerId as 'origin' | 'destination'] = new Marker()
      .setLngLat(lngLat)
      .togglePopup()
      .addTo(map)

    if (options.moveMap) {
      this._moveToLngLat(lngLat)
    }
  }

  private _clearMarker(markerId: string) {
    if (markerId === 'origin') {
      this.removeOriginMarker()
    } else if (markerId === 'destination') {
      this.removeDestinationMarker()
    }
  }

  public removeOriginMarker() {
    const originMarker = this._markers['origin']

    if (!originMarker) {
      return
    }

    this._routeActions.clearOrigin()
    this._routeActions.clearRouteRequestError()
    this._routeActions.clearRoutes()
    this._graphActions.clearData()

    originMarker.remove()
    this._markers['origin'] = null

    if (this._map) {
      this._clearRoute(this._map)
    }
  }

  public removeDestinationMarker() {
    const destinationMarker = this._markers['destination']

    if (!destinationMarker) {
      return
    }

    this._routeActions.clearDestination()
    this._routeActions.clearRouteRequestError()
    this._routeActions.clearRoutes()
    this._graphActions.clearData()

    destinationMarker.remove()
    this._markers['destination'] = null

    if (this._map) {
      this._clearRoute(this._map)
    }
  }

  public removeMarkers() {
    this.removeOriginMarker()
    this.removeDestinationMarker()
  }

  private _handleClick = (e: MapMouseEvent, map: Map) => {
    const { lngLat } = e
    const { lat, lng } = lngLat

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      console.warn('MapManager#_handleClick = No lat/lng detected in mouse event')
      return
    }

    const originMarker = this._markers['origin']
    const destinationMarker = this._markers['destination']
    const routeRequestError = this._routeStore.getRouteRequestError()

    if (!routeRequestError && originMarker && destinationMarker) {
      return
    }

    const nextMarker = originMarker ? 'destination' : 'origin'

    if (routeRequestError && nextMarker === 'destination') {
        this.addOriginMarker(lngLat)
        return
    }

    if (nextMarker === 'origin') {
      this.addOriginMarker(lngLat)
    } else {
      this.addDestinationMarker(lngLat)
    }
  }

  private _drawRoute(route: Route | null, map: Map | null) {
    if (!route) {
      console.error('MapManager#_drawRoute -> No route available')
      return
    }

    if (!map) {
      console.error('MapManager#_drawRoute -> No map available')
      return
    }

    if (!map.isStyleLoaded()) {
      return
    }

    this._clearRoute(map)
    const features = RouteUtils.createRouteFeatures(route)

    const routeSource = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features,
      },
    }
    // @ts-ignore: Incompatible type definitions
    map.addSource('route', routeSource)

    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      paint: {
        'line-width': 3,
        'line-color': [ 'get', 'color' ]
      }
    })
  }

  private _clearRoute(map: Map) {
    if (map.getLayer('route')) {
      map.removeLayer('route')
    }

    if (map.getSource('route')) {
      map.removeSource('route')
    }
  }
}

