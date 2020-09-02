import { State as ConfigState } from '../reducers/config-reducer'
import { State as GraphState } from '../reducers/graph-reducer'
import { State as MapState } from '../reducers/map-reducer'
import { State as RouteState } from '../reducers/route-reducer'

export interface RootState {
  config: ConfigState,
  graph: GraphState,
  map: MapState,
  route: RouteState,
}
