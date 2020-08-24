import { CONFIG_ACTIONS_TYPES } from '../services/actions/config-actions'
import { ROUTE_ACTIONS_TYPES } from '../services/actions/route-actions'
import { GRAPH_ACTION_TYPES } from '../services/actions/graph-actions'
import { MAP_ACTION_TYPES } from '../services/actions/map-actions'

export type ActionType = (
  keyof typeof CONFIG_ACTIONS_TYPES |
  keyof typeof ROUTE_ACTIONS_TYPES |
  keyof typeof GRAPH_ACTION_TYPES |
  keyof typeof MAP_ACTION_TYPES
)

export interface Action {
  type: ActionType,
  data: { [key: string]: any },
}

