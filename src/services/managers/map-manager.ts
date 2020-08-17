import mapboxgl, { Map, Marker, MapMouseEvent, GeolocateControl } from 'mapbox-gl'

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
    //this._attachStoreListeners(this._map)
  }

  public removeMap() {
    if (!this._map) {
      console.warn('MapManager#removeMap -> Attempting to remove non-existing map!')
      return
    }

    this._map.remove()
  }

  _attachListeners(map: Map) {
    map.on('click', this._handleClick)
  }

  //_attachStoreListeners(map) {
  //  this._store.addListener('change', (state, prevState) => {
  //    this._setOriginMarker(state.origin, map)

  //    this._setDestinationMarker(state.destination, map)

  //    if (
  //      prevState.activeRoute !== state.activeRoute ||
  //      prevState.osrmResult !== state.osrmResult
  //    ) {
  //      this._drawRoute(state.activeRoute, state.osrmResult, map)
  //    }
  //  })
  //}

  //_setOriginMarker(lngLat, map) {
  //  const marker = this._markers['origin']

  //  if (marker) {
  //    marker.remove()
  //  }

  //  if (!lngLat) {
  //    return
  //  }

  //  this._markers['origin'] = new mapboxgl.Marker()
  //    .setLngLat(lngLat)
  //    .togglePopup()
  //    .addTo(map)
  //}

  //_setDestinationMarker(lngLat, map) {
  //  const marker = this._markers['destination']

  //  if (marker) {
  //    marker.remove()
  //  }

  //  if (!lngLat) {
  //    return
  //  }

  //  this._markers['destination'] = new mapboxgl.Marker()
  //    .setLngLat(lngLat)
  //    .togglePopup()
  //    .addTo(map)
  //}

  _handleClick = (e: MapMouseEvent) => {
    console.info('map clicked ', e.lngLat)
    //if (!this._store.get('origin')) {
    //  this._store.set('origin', e.lngLat)
    //} else if (!this._store.get('destination')) {
    //  this._store.set('destination', e.lngLat)
    //}
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

