import { LngLat } from 'mapbox-gl'

import { Action } from '../../../interfaces/actions'
import { Route } from '../../../interfaces/route'

export const ROUTE_ACTION_SET_ORIGIN = 'ROUTE_ACTION_SET_ORIGIN'
export const ROUTE_ACTION_SET_DESTINATION = 'ROUTE_ACTION_SET_DESTINATION'
export const ROUTE_ACTION_CLEAR_ORIGIN = 'ROUTE_ACTION_CLEAR_ORIGIN'
export const ROUTE_ACTION_CLEAR_DESTINATION = 'ROUTE_ACTION_CLEAR_DESTINATION'
export const ROUTE_ACTION_REQUEST = 'ROUTE_ACTION_REQUEST'
export const ROUTE_ACTION_REQUEST_FINISHED = 'ROUTE_ACTION_REQUEST_FINISHED'
export const ROUTE_ACTION_REQUEST_ERROR = 'ROUTE_ACTION_REQUEST_ERROR'
export const ROUTE_ACTION_REQUEST_ERROR_CLEAR = 'ROUTE_ACTION_REQUEST_ERROR_CLEAR'
export const ROUTE_ACTION_ROUTES_SET = 'ROUTE_ACTION_ROUTES_SET'
export const ROUTE_ACTION_ROUTES_CLEAR = 'ROUTE_ACTION_ROUTES_CLEAR'

export const ROUTE_ACTIONS_TYPES = {
  [ROUTE_ACTION_SET_ORIGIN]: ROUTE_ACTION_SET_ORIGIN,
  [ROUTE_ACTION_SET_DESTINATION]: ROUTE_ACTION_SET_DESTINATION,
  [ROUTE_ACTION_CLEAR_ORIGIN]: ROUTE_ACTION_CLEAR_ORIGIN,
  [ROUTE_ACTION_CLEAR_DESTINATION]: ROUTE_ACTION_CLEAR_DESTINATION,
  [ROUTE_ACTION_REQUEST]: ROUTE_ACTION_REQUEST,
  [ROUTE_ACTION_REQUEST_FINISHED]: ROUTE_ACTION_REQUEST_FINISHED,
  [ROUTE_ACTION_REQUEST_ERROR]: ROUTE_ACTION_REQUEST_ERROR,
  [ROUTE_ACTION_ROUTES_SET]: ROUTE_ACTION_ROUTES_SET,
  [ROUTE_ACTION_ROUTES_CLEAR]: ROUTE_ACTION_ROUTES_CLEAR,
  [ROUTE_ACTION_REQUEST_ERROR_CLEAR]: ROUTE_ACTION_REQUEST_ERROR_CLEAR,
}

export interface SetOriginAction extends Action {
  type: typeof ROUTE_ACTION_SET_ORIGIN,
  data: { origin: LngLat },
}

export interface SetDestinationAction extends Action {
  type: typeof ROUTE_ACTION_SET_DESTINATION,
  data: { destination: LngLat },
}

export interface ClearOriginAction extends Action {
  type: typeof ROUTE_ACTION_CLEAR_ORIGIN,
}

export interface ClearDestinationAction extends Action {
  type: typeof ROUTE_ACTION_CLEAR_DESTINATION,
}

export interface SetRouteRequestActions extends Action {
  type: typeof ROUTE_ACTION_REQUEST,
}

export interface SetRouteRequestFinishedAction extends Action {
  type: typeof ROUTE_ACTION_REQUEST_FINISHED,
}

export interface SetRouteRequestErrorAction extends Action {
  type: typeof ROUTE_ACTION_REQUEST_ERROR,
  data: { error: Error }
}

export interface ClearRouteRequestErrorAction extends Action {
  type: typeof ROUTE_ACTION_REQUEST_ERROR_CLEAR,
}

export interface SetRoutesAction extends Action {
  type: typeof ROUTE_ACTION_ROUTES_SET,
  data: { routes: Array<Route> }
}

export interface ClearRoutesAction extends Action {
  type: typeof ROUTE_ACTION_ROUTES_CLEAR,
}

export type RouteActionCreators = (
  SetOriginAction |
  SetDestinationAction |
  ClearOriginAction |
  ClearDestinationAction |
  SetRouteRequestActions |
  SetRouteRequestFinishedAction |
  SetRouteRequestErrorAction |
  ClearRouteRequestErrorAction |
  SetRoutesAction |
  ClearRoutesAction
)


export const setOrigin = (origin: LngLat) => {
  return {
    type: ROUTE_ACTION_SET_ORIGIN,
    data: { origin },
  }
}

export const setDestination = (destination: LngLat) => {
  return {
    type: ROUTE_ACTION_SET_DESTINATION,
    data: { destination },
  }
}

export const clearOrigin = () => {
  return {
    type: ROUTE_ACTION_CLEAR_ORIGIN,
    data: {},
  }
}

export const clearDestination = () => {
  return {
    type: ROUTE_ACTION_CLEAR_DESTINATION,
    data: {},
  }
}

export const startRouteRequest = () => {
  return {
    type: ROUTE_ACTION_REQUEST,
    data: {},
  }
}

export const stopRouteRequest = () => {
  return {
    type: ROUTE_ACTION_REQUEST_FINISHED,
    data: {},
  }
}

export const setRouteRequestError = (error: Error) => {
  return {
    type: ROUTE_ACTION_REQUEST_ERROR,
    data: { error },
  }
}

export const clearRouteRequestError = () => {
  return {
    type: ROUTE_ACTION_REQUEST_ERROR_CLEAR,
    data: {},
  }
}

export const setRoutes = (routes: Array<Route>) => {
  return {
    type: ROUTE_ACTION_ROUTES_SET,
    data: { routes },
  }
}

export const clearRoutes = () => {
  return {
    type: ROUTE_ACTION_ROUTES_CLEAR,
    data: {},
  }
}

