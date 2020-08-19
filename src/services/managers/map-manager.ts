import mapboxgl, { LngLat, Map, Marker, MapMouseEvent, GeolocateControl } from 'mapbox-gl'

import RouteActions from '../actions/route-actions'

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

  constructor(services: {
    routeActions: RouteActions,
  }) {
    this._routeActions = services.routeActions
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

    this._addMarker(this._map, 'origin', lngLat)
  }

  public addDestinationMarker(lngLat: LngLat) {
    if (!this._map) {
      console.warn('MapManager#addDestinationMarker -> Missing Map instance')
      return
    }

    this._addMarker(this._map, 'destination', lngLat)
  }

  private _addMarker(map: Map, markerId: string, lngLat: LngLat) {
    this._markers[markerId as 'origin' | 'destination'] = new Marker()
      .setLngLat(lngLat)
      .togglePopup()
      .addTo(map)
  }

  public removeOriginMarker() {
    const originMarker = this._markers['origin']

    if (!originMarker) {
      return
    }

    originMarker.remove()
    this._markers['origin'] = null
  }

  public removeDestinationMarker() {
    const destinationMarker = this._markers['destination']

    if (!destinationMarker) {
      return
    }

    destinationMarker.remove()
    this._markers['destination'] = null
  }

  private _handleClick = (e: MapMouseEvent, map: Map) => {
    console.info('map clicked ', e.lngLat)
    const { lngLat } = e
    const { lat, lng } = lngLat

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      console.warn('MapManager#_handleClick = No lat/lng detected in mouse event')
      return
    }

    const originMarker = this._markers['origin']
    const destinationMarker = this._markers['destination']

    if (originMarker && destinationMarker) {
      return
    }

    const nextMarker = originMarker ? 'destination' : 'origin'

    this._markers[nextMarker] = new Marker()
      .setLngLat(lngLat)
      .togglePopup()
      .addTo(map)

    if (nextMarker === 'origin') {
      this._routeActions.setOrigin(lngLat)
    } else {
      this._routeActions.setDestination(lngLat)
    }
  }

  //_drawRoute(activeRoute, osrmResult, map) {
  //  const route = osrmResult.routes[activeRoute]

  //  if (!route) {
  //    console.warn('Drawing blank route ->')
  //    return
  //  }

  //  if (map.getLayer('route')) {
  //    map.removeLayer('route')
  //  }

  //  if (map.getSource('route')) {
  //    map.removeSource('route')
  //  }

  //  map.addSource('route', {
  //    type: 'geojson',
  //    data: {
  //      type: 'Feature',
  //      properties: {},
  //      geometry: route.geometry,
  //    }
  //  })

  //  map.addLayer({
  //    'id': 'route',
  //    'type': 'line',
  //    'source': 'route',
  //    'layout': {
  //    'line-join': 'round',
  //    'line-cap': 'round'
  //    },
  //    'paint': {
  //    'line-color': '#888',
  //    'line-width': 8
  //    }
  //  })
  //}
}

