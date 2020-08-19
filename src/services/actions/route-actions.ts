import { LngLat } from 'mapbox-gl'

import ActionCreator from './action-creator'
import { Action } from '../../interfaces/stores'
import { Route } from '../../interfaces/route'

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


export default class ConfigActions extends ActionCreator {
  setOrigin(origin: LngLat) {
    this.dispatch({
      type: ROUTE_ACTION_SET_ORIGIN,
      data: { origin },
    })
  }

  setDestination(destination: LngLat) {
    this.dispatch({
      type: ROUTE_ACTION_SET_DESTINATION,
      data: { destination },
    })
  }

  clearOrigin() {
    this.dispatch({
      type: ROUTE_ACTION_CLEAR_ORIGIN,
      data: {},
    })
  }

  clearDestination() {
    this.dispatch({
      type: ROUTE_ACTION_CLEAR_DESTINATION,
      data: {},
    })
  }

  startRouteRequest() {
    this.dispatch({
      type: ROUTE_ACTION_REQUEST,
      data: {},
    })
  }

  stopRouteRequest() {
    this.dispatch({
      type: ROUTE_ACTION_REQUEST_FINISHED,
      data: {},
    })
  }

  setRouteRequestError(error: Error) {
    this.dispatch({
      type: ROUTE_ACTION_REQUEST_ERROR,
      data: { error },
    })
  }

  clearRouteRequestError() {
    this.dispatch({
      type: ROUTE_ACTION_REQUEST_ERROR_CLEAR,
      data: {},
    })
  }

  setRoutes(routes: Array<Route>) {
    this.dispatch({
      type: ROUTE_ACTION_ROUTES_SET,
      data: { routes },
    })
  }

  clearRoutes() {
    this.dispatch({
      type: ROUTE_ACTION_ROUTES_CLEAR,
      data: {},
    })
  }
}

