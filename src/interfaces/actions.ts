import { CONFIG_ACTIONS_TYPES, ConfigActionCreators } from '../services/actions/config'
import { ROUTE_ACTIONS_TYPES, RouteActionCreators } from '../services/actions/route'
import { GRAPH_ACTION_TYPES, GraphActionCreators } from '../services/actions/graph'
import { MAP_ACTION_TYPES, MapActionCreators } from '../services/actions/map'

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

export type ActionCreator = (
  ConfigActionCreators |
  RouteActionCreators |
  GraphActionCreators |
  MapActionCreators
)

