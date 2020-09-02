import { CONFIG_ACTIONS_TYPES, ConfigActionCreators } from '../services/actions/config/action-creators'

export interface State {
  mapboxToken: string | null,
}

const defaults: State = {
  mapboxToken: null
}

const initialState: State = defaults

const configReducer = (state: State = initialState, action: ConfigActionCreators): State => {
    switch (action.type) {
      case CONFIG_ACTIONS_TYPES.CONFIG_ACTION_SET_PROPERTY:
        const { property, value } = action.data
        return {
          ...state,
          [property]: value,
        }
      default:
        return state
    }
}

export default configReducer
