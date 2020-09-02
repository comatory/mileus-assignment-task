import { Map } from 'mapbox-gl'
import { Action } from '../../../interfaces/actions'

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

export type MapActionCreators = (
  SetMapAction |
  ClearMapAction
)

export const setMap = (map: Map) => {
  return {
    type: MAP_ACTION_SET_MAP,
    data: { map },
  }
}

export const clearMap = () => {
  return {
    type: MAP_ACTION_CLEAR_MAP,
    data: {},
  }
}
