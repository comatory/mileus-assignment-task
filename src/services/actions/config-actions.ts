import ActionCreator from './action-creator'
import { Action } from '../../interfaces/stores'

export const CONFIG_ACTION_SET_PROPERTY = 'CONFIG_ACTION_SET_PROPERTY'

export const CONFIG_ACTIONS_TYPES = {
  [CONFIG_ACTION_SET_PROPERTY]: CONFIG_ACTION_SET_PROPERTY,
}

export interface SetConfigPropertyAction extends Action {
  type: typeof CONFIG_ACTION_SET_PROPERTY,
  data: { [key: string]: any },
}

export default class ConfigActions extends ActionCreator {
  setProperty(property: string, value: string | number) {
    this.dispatch({
      type: CONFIG_ACTION_SET_PROPERTY,
      data: { property, value },
    })
  }
}

