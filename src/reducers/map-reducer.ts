import { Map } from 'mapbox-gl'

import {
  SetMapAction,
  MapActionCreators,
  MAP_ACTION_TYPES,
} from '../services/actions/map/action-creators'

export interface State {
  map: Map | null,
}

const defaults: State = {
  map: null
}

const initialState: State = defaults

const mapReducer = (state: State = initialState, action: MapActionCreators): State => {
  switch(action.type) {
    case MAP_ACTION_TYPES.MAP_ACTION_SET_MAP:
      const setMapAction = action as SetMapAction
      const { map } = setMapAction.data
      return {
        ...state,
        map,
      }
    case MAP_ACTION_TYPES.MAP_ACTION_CLEAR_MAP:
      return {
        ...state,
        map: null,
      }
    default:
      return state
  }
}

export default mapReducer
