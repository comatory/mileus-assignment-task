import { Action } from '../../../interfaces/actions'

export const CONFIG_ACTION_SET_PROPERTY = 'CONFIG_ACTION_SET_PROPERTY'

export const CONFIG_ACTIONS_TYPES = {
  [CONFIG_ACTION_SET_PROPERTY]: CONFIG_ACTION_SET_PROPERTY,
}

export interface SetConfigPropertyAction extends Action {
  type: typeof CONFIG_ACTION_SET_PROPERTY,
  data: { [key: string]: any },
}

export type ConfigActionCreators = SetConfigPropertyAction

export const setProperty = (property: string, value: string | number) => {
  return {
    type: CONFIG_ACTION_SET_PROPERTY,
    data: { property, value },
  }
}

