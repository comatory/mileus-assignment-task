import { Dispatcher } from 'flux'
import { ReduceStore } from 'flux/utils'
import { SetConfigPropertyAction, CONFIG_ACTIONS_TYPES } from '../actions/config-actions'

interface State {
  token: string | null,
}

const defaults: State = {
  token: null
}

const initialState: State = defaults

type ConfigAction = SetConfigPropertyAction

export default class ConfigStore extends ReduceStore<State, ConfigAction> {
  constructor(services: {
    dispatcher: Dispatcher<ConfigAction>,
  }) {
    super(services.dispatcher)
  }

  getInitialState(): State {
    return initialState
  }

  reduce(state: State, action: ConfigAction): State {
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

  getToken(): string | null {
    return this.getState().token
  }

  getValueByKey(key: string): string | null {
    return this.getState()[key as keyof State] || null
  }
}

