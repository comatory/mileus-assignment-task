import ActionCreator from './action-creator'
import { Map } from 'mapbox-gl'
import { Action } from '../../interfaces/stores'

export const MAP_ACTION_SET_MAP = 'MAP_ACTION_SET_MAP'
export const MAP_ACTION_CLEAR_MAP = 'MAP_ACTION_CLEAR_MAP'

export const MAP_ACTION_TYPES = {
  [MAP_ACTION_SET_MAP]: MAP_ACTION_SET_MAP,
  [MAP_ACTION_CLEAR_MAP]: MAP_ACTION_CLEAR_MAP,
}

export interface SetMapAction extends Action {
  type: typeof MAP_ACTION_SET_MAP,
  data: { map: Map },
}

export interface ClearMapAction extends Action {
  type: typeof MAP_ACTION_CLEAR_MAP,
}

export default class ConfigActions extends ActionCreator {
  setMap(map: Map) {
    this.dispatch({
      type: MAP_ACTION_SET_MAP,
      data: { map },
    })
  }

  clearMap() {
    this.dispatch({
      type: MAP_ACTION_CLEAR_MAP,
      data: {},
    })
  }
}

