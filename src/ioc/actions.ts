import { Ioc } from '@adonisjs/fold'

import { setProperty } from '../services/actions/config'
import {
  setOrigin,
  setDestination,
  clearOrigin,
  clearDestination,
  startRouteRequest,
  stopRouteRequest,
  setRouteRequestError,
  clearRouteRequestError,
  setRoutes,
  clearRoutes,
} from '../services/actions/route'
import {
  registerPlayerGraphCanvas,
  unregisterPlayerGraphCanvas,
  play,
  stop,
  pause,
  reset,
  setMultiplication,
  clearData,
} from '../services/actions/graph'
import {
  createMap,
  removeMap,
  addOriginMarker,
  addDestinationMarker,
  initialize,
  findRoute,
  moveToOrigin,
  moveToDestination,
  removeOriginMarker,
  removeDestinationMarker,
  removeMarkers,
} from '../services/actions/map'

import { Services } from '../interfaces/services'

export default (ioc: Ioc<Services>) => {
  ioc.singleton('configActions', () => {
    return { setProperty }
  })

  ioc.singleton('routeActions', () => {
    return {
      setOrigin,
      setDestination,
      clearOrigin,
      clearDestination,
      startRouteRequest,
      stopRouteRequest,
      setRouteRequestError,
      clearRouteRequestError,
      setRoutes,
      clearRoutes,
    }
  })

  ioc.singleton('graphActions', () => {
    return {
      registerPlayerGraphCanvas,
      unregisterPlayerGraphCanvas,
      play,
      stop,
      pause,
      reset,
      setMultiplication,
      clearData,
    }
  })

  ioc.singleton('mapActions', () => {
    return {
      initialize,
      createMap,
      removeMap,
      addOriginMarker,
      addDestinationMarker,
      findRoute,
      moveToOrigin,
      moveToDestination,
      removeOriginMarker,
      removeDestinationMarker,
      removeMarkers,
    }
  })

  return {
    configActions: ioc.use('configActions'),
    routeActions: ioc.use('routeActions'),
    graphActions: ioc.use('graphActions'),
    mapActions: ioc.use('mapActions'),
  }
}

