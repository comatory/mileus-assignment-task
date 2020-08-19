import { CONFIG_ACTIONS_TYPES } from '../services/actions/config-actions'
import { ROUTE_ACTIONS_TYPES } from '../services/actions/route-actions'

export type ActionType = (
  keyof typeof CONFIG_ACTIONS_TYPES |
  keyof typeof ROUTE_ACTIONS_TYPES
)

export interface Action {
  type: ActionType,
  data: { [key: string]: any },
}

