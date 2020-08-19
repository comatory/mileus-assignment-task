import { LngLat } from 'mapbox-gl'

import ActionCreator from './action-creator'
import { Action } from '../../interfaces/stores'

export const ROUTE_ACTION_SET_ORIGIN = 'ROUTE_ACTION_SET_ORIGIN'
export const ROUTE_ACTION_SET_DESTINATION = 'ROUTE_ACTION_SET_DESTINATION'
export const ROUTE_ACTION_CLEAR_ORIGIN = 'ROUTE_ACTION_CLEAR_ORIGIN'
export const ROUTE_ACTION_CLEAR_DESTINATION = 'ROUTE_ACTION_CLEAR_DESTINATION'

export const ROUTE_ACTIONS_TYPES = {
  [ROUTE_ACTION_SET_ORIGIN]: ROUTE_ACTION_SET_ORIGIN,
  [ROUTE_ACTION_SET_DESTINATION]: ROUTE_ACTION_SET_DESTINATION,
  [ROUTE_ACTION_CLEAR_ORIGIN]: ROUTE_ACTION_CLEAR_ORIGIN,
  [ROUTE_ACTION_CLEAR_DESTINATION]: ROUTE_ACTION_CLEAR_DESTINATION,
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
}

