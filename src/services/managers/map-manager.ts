import mapboxgl, {
  LngLat,
  Map,
  Marker,
  MapMouseEvent,
  GeolocateControl,
} from 'mapbox-gl'

import RouteActions from '../actions/route-actions'
import RouteRetriever from '../retrievers/route-retriever'
import RouteStore from '../stores/route-store'
import { Route } from '../../interfaces/route'

interface Markers {
  origin: Marker | null,
  destination: Marker | null,
}

export default class MapManager {
  private _map: Map | null = null
  private _markers: Markers = {
    origin: null,
    destination: null,
  }
  private _routeActions: RouteActions
  private _routeRetriever: RouteRetriever
  private _routeStore: RouteStore

  constructor(services: {
    routeActions: RouteActions,
    routeRetriever: RouteRetriever,
    routeStore: RouteStore,
  }) {
    this._routeActions = services.routeActions
    this._routeRetriever = services.routeRetriever
    this._routeStore = services.routeStore
  }

  public initialize(token: string) {
    mapboxgl.accessToken = token
  }

  public createMap(node: HTMLElement) {
    this._map = new Map({
      container: node.id,
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    })

    this._attachListeners(this._map)

    // NOTE: Might not work in Chromium, works fine in Chrome / FF
    this._map.addControl(new GeolocateControl({
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

  public addOriginMarker(lngLat: LngLat) {
    if (!this._map) {
      console.warn('MapManager#addOriginMarker -> Missing Map instance')
      return
    }

    this._routeActions.clearRouteRequestError()
    this._routeActions.setOrigin(lngLat)
    this._addMarker(this._map, 'origin', lngLat)
  }

  public addDestinationMarker(lngLat: LngLat) {
    if (!this._map) {
      console.warn('MapManager#addDestinationMarker -> Missing Map instance')
      return
    }

    this._routeActions.clearRouteRequestError()
    this._routeActions.setDestination(lngLat)
    this._addMarker(this._map, 'destination', lngLat)
  }

  public async findRoute(origin: LngLat, destination: LngLat) {
    this._routeActions.startRouteRequest()

    try {
      const routes = await this._routeRetriever.fetchRoute(origin, destination)
      this._routeActions.setRoutes(routes)

      this._drawRoute(routes[0], this._map)
    } catch (err) {
      this._routeActions.setRouteRequestError(err)
    }

    this._routeActions.stopRouteRequest()
  }

  private _addMarker(map: Map, markerId: string, lngLat: LngLat) {
    this._clearMarker(markerId)

    this._markers[markerId as 'origin' | 'destination'] = new Marker()
      .setLngLat(lngLat)
      .togglePopup()
      .addTo(map)
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

    destinationMarker.remove()
    this._markers['destination'] = null

    if (this._map) {
      this._clearRoute(this._map)
    }
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

    this._clearRoute(map)

    // @ts-ignore: Incompatible type definitions
    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: route.geometry,
      },
    })

    map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
      'line-join': 'round',
      'line-cap': 'round'
      },
      'paint': {
      'line-color': '#888',
      'line-width': 8
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

