import { CONFIG_ACTIONS_TYPES, ConfigActionCreators } from '../services/actions/config/action-creators'

export interface State {
  mapboxToken: string | null,
}

export const getInitialState = (): State => {
  return {
    mapboxToken: null
  }
}

const configReducer = (state: State = getInitialState(), action: ConfigActionCreators): State => {
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
