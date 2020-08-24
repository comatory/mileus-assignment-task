import { Dispatcher } from 'flux'
import { ReduceStore } from 'flux/utils'
import { Map } from 'mapbox-gl'

import {
  SetMapAction,
  ClearMapAction,
  MAP_ACTION_TYPES,
} from '../actions/map-actions'

interface State {
  map: Map | null,
}

const defaults: State = {
  map: null
}

const initialState: State = defaults

type ConfigAction = SetMapAction | ClearMapAction

export default class MapStore extends ReduceStore<State, ConfigAction> {
  constructor(services: {
    dispatcher: Dispatcher<ConfigAction>,
  }) {
    super(services.dispatcher)
  }

  getInitialState(): State {
    return initialState
  }

  reduce(state: State, action: ConfigAction): State {
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

  getMap(): Map | null {
    return this.getState().map
  }
}

