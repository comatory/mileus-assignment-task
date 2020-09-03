import mapboxgl, {
  LngLat,
  Map,
  Marker,
  MapMouseEvent,
  GeolocateControl,
} from 'mapbox-gl'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import {
  setMap,
  clearMap,
} from './action-creators'
import {
  setOrigin,
  setDestination,
  startRouteRequest,
  setRoutes,
  setRouteRequestError,
  stopRouteRequest,
  clearOrigin,
  clearRouteRequestError,
  clearRoutes,
  clearDestination,
} from '../route'
import { setData } from '../graph'
import { RootState } from '../../../interfaces/state'
import { Services } from '../../../interfaces/services'
import GraphUtils from '../../../utils/graph-utils'
import RouteUtils from '../../../utils/route-utils'
import { Route } from '../../../interfaces/route'

interface Markers {
  origin: Marker | null,
  destination: Marker | null,
}

const markers: Markers = {
  origin: null,
  destination: null
}

export const initialize = (token: string) => {
  mapboxgl.accessToken = token
}


const attachListeners = (
  dispatch: ThunkDispatch<RootState, Services, AnyAction>,
  getState: () => RootState,
  services: Services,
  map: Map
) => {
  map.on('click', (e: MapMouseEvent) => handleClick(dispatch, getState, services, e, map))
}


export const createMap = (node: HTMLElement) => {
  return (
    dispatch: ThunkDispatch<RootState, Services, AnyAction>,
    getState: () => RootState,
    services: Services
  ) => {
    const map = services.mapFactory({
      container: node.id,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ 14.422235843328906, 50.08298059442754 ],
      zoom: 18,
    })

    // NOTE: Might not work in Chromium, works fine in Chrome / FF
    map.addControl(new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }))

    dispatch(setMap(map))
    attachListeners(dispatch, getState, services, map)
  }
}

export const removeMap = () => {
  return (
    dispatch: ThunkDispatch<RootState, Services, AnyAction>,
    getState: () => RootState,
  ) => {
    const map = getState().map.map

    if (!map) {
      console.warn('MapManager#removeMap -> Attempting to remove non-existing map!')
      return
    }

    dispatch(clearMap())
    map.remove()
  }
}

export const addOriginMarker = (lngLat: LngLat, moveMap?: boolean) => {
  return (
    dispatch: ThunkDispatch<RootState, Services, AnyAction>,
    getState: () => RootState,
    services: Services,
  ) => {
    addOriginMarkerData(dispatch, getState, services, lngLat, moveMap || false)
  }
}

const addOriginMarkerData = (
  dispatch: ThunkDispatch<RootState, Services, AnyAction>,
  getState: () => RootState,
  services: Services,
  lngLat: LngLat,
  moveMap: boolean = false,
) => {
  const map = getState().map.map
  if (!map) {
    console.warn('MapManager#addOriginMarker -> Missing Map instance')
    return
  }

  addMarker(dispatch, getState, services, map, 'origin', lngLat, {
    moveMap
  })

  dispatch(clearRouteRequestError())
  dispatch(setOrigin(lngLat))
}

export const addDestinationMarker = (lngLat: LngLat, moveMap?: boolean) => {
  return (
    dispatch: ThunkDispatch<RootState, Services, AnyAction>,
    getState: () => RootState,
    services: Services,
  ) => {
    addDestinationMarkerData(dispatch, getState, services, lngLat, moveMap || false)
  }
}

const addDestinationMarkerData = (
  dispatch: ThunkDispatch<RootState, Services, AnyAction>,
  getState: () => RootState,
  services: Services,
  lngLat: LngLat,
  moveMap: boolean = false,
) => {
  const map = getState().map.map
  if (!map) {
    console.warn('MapManager#addDestinationMarker -> Missing Map instance')
    return
  }

  addMarker(dispatch, getState, services, map, 'destination', lngLat, {
    moveMap,
  })

  dispatch(clearRouteRequestError())
  dispatch(setDestination(lngLat))
}

export const findRoute = (origin: LngLat, destination: LngLat) => {
  return async (
    dispatch: ThunkDispatch<RootState, Services, AnyAction>,
    getState: () => RootState,
    services: Services
  ) => {
    dispatch(startRouteRequest())

    try {
      const routes = await services.routeRetriever.fetchRoute(origin, destination)
      dispatch(setRoutes(routes))

      // NOTE: The app would eventually support multiple routes but for simplicity
      //       (and I also have limited time) I decided to deal with single routes
      //       and single leg of journey)
      const route = routes[0]

      const map = getState().map.map
      drawRoute(route, map)

      const graphData = GraphUtils.createGraph(route)
      dispatch(setData(graphData))
    } catch (err) {
      dispatch(setRouteRequestError(err))
    }

    dispatch(stopRouteRequest())
  }
}

export const moveToOrigin = () => {
  return (
    _dispatch: ThunkDispatch<RootState, Services, AnyAction>,
    getState: () => RootState,
  ) => {
    const originMarker = markers['origin']

    if (!originMarker) {
      return
    }

    const lngLat = originMarker.getLngLat()
    moveToLngLat(getState, lngLat)
  }
}

export const moveToDestination = () => {
  return (
    _dispatch: ThunkDispatch<RootState, Services, AnyAction>,
    getState: () => RootState,
  ) => {
    const destinationMarker = markers['destination']

    if (!destinationMarker) {
      return
    }

    const lngLat = destinationMarker.getLngLat()
    moveToLngLat(getState, lngLat)
  }
}

const moveToLngLat = (getState: () => RootState, lngLat: LngLat) => {
  const map = getState().map.map
  if (!map) {
    return
  }

    map.flyTo({
      center: [ lngLat.lng, lngLat.lat ],
      zoom: 14,
    })
  }

const addMarker =(
  dispatch: ThunkDispatch<RootState, Services, AnyAction>,
  getState: () => RootState,
  services: Services,
  map: Map,
  markerId: string,
  lngLat: LngLat,
  options: Partial<{ moveMap: boolean }> = {}
) => {
  clearMarker(dispatch, getState, services, markerId)

  markers[markerId as 'origin' | 'destination'] = new Marker()
    .setLngLat(lngLat)
    .togglePopup()
    .addTo(map)

  if (options.moveMap) {
    moveToLngLat(getState, lngLat)
  }
}

const clearMarker = (
  dispatch: ThunkDispatch<RootState, Services, AnyAction>,
  getState: () => RootState,
  services: Services,
  markerId: string
) => {
  if (markerId === 'origin') {
    removeOriginMarkerData(dispatch, getState, services)
  } else if (markerId === 'destination') {
    removeDestinationMarkerData(dispatch, getState, services)
  }
}

export const removeOriginMarker = () => {
  return (
    dispatch: ThunkDispatch<RootState, Services, AnyAction>,
    getState: () => RootState,
    services: Services,
  ) => {
    removeOriginMarkerData(dispatch, getState, services)
  }
}

export const removeDestinationMarker = () => {
  return (
    dispatch: ThunkDispatch<RootState, Services, AnyAction>,
    getState: () => RootState,
    services: Services
  ) => {
    removeDestinationMarkerData(dispatch, getState, services)
  }
}

const removeOriginMarkerData = (
  dispatch: ThunkDispatch<RootState, Services, AnyAction>,
  getState: () => RootState,
  services: Services
) => {
  const originMarker = markers['origin']

  if (!originMarker) {
    return
  }

  dispatch(clearOrigin())
  dispatch(clearRouteRequestError())
  dispatch(clearRoutes())
  dispatch(services.graphActions.clearData())

  originMarker.remove()
  markers['origin'] = null

  const map = getState().map.map
  if (map) {
    clearRoute(map)
  }
}

const removeDestinationMarkerData = (
  dispatch: ThunkDispatch<RootState, Services, AnyAction>,
  getState: () => RootState,
  _services: Services
) => {
  const destinationMarker = markers['destination']

  if (!destinationMarker) {
    return
  }

  dispatch(clearDestination())
  dispatch(clearRouteRequestError())

  destinationMarker.remove()

  markers['destination'] = null

  const map = getState().map.map
  if (map) {
    clearRoute(map)
  }
}

export const removeMarkers = () => {
  return (
    dispatch: ThunkDispatch<RootState, Services, AnyAction>,
    getState: () => RootState,
    services: Services
  ) => {
    removeOriginMarkerData(dispatch, getState, services)
    removeDestinationMarkerData(dispatch, getState, services)
  }
}

const handleClick = (
  dispatch: ThunkDispatch<RootState, Services, AnyAction>,
  getState: () => RootState,
  services: Services,
  e: MapMouseEvent,
  _map: Map,
) => {
  const { lngLat } = e
  const { lat, lng } = lngLat

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    console.warn('MapManager#_handleClick = No lat/lng detected in mouse event')
    return
  }

  const originMarker = markers['origin']
  const destinationMarker = markers['destination']
  const routeRequestError = getState().route.routeRequestError

  if (!routeRequestError && originMarker && destinationMarker) {
    return
  }

  const nextMarker = originMarker ? 'destination' : 'origin'

  if (routeRequestError && nextMarker === 'destination') {
      addOriginMarker(lngLat)
      return
  }

  if (nextMarker === 'origin') {
    addOriginMarkerData(dispatch, getState, services, lngLat)
  } else {
    addDestinationMarkerData(dispatch, getState, services, lngLat)
  }
}

const drawRoute = (route: Route | null, map: Map | null) => {
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

  clearRoute(map)
  const features = RouteUtils.createRouteFeatures(route)

  const routeSource = {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features,
    },
  }
  // @ts-ignore
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

const clearRoute = (map: Map) => {
  if (!map.isStyleLoaded()) {
    return
  }

  if (map.getLayer('route')) {
    map.removeLayer('route')
  }

  if (map.getSource('route')) {
    map.removeSource('route')
  }
}
