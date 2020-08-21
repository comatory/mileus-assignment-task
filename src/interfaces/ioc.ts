import { Dispatcher } from 'flux'

import { Action } from '../interfaces/stores'
import { IRouteStore } from '../interfaces/stores'

import {
  ConfigActions,
  RouteActions,
  GraphActions,
} from '../services/actions'
import { GraphManager, MapManager } from '../services/managers'
import { RouteRetriever } from '../services/retrievers'
import {
  ConfigStore,
  GraphStore,
} from '../services/stores'
import ApiClient from '../services/api-client'

interface Ioc {
  dispatcher: Dispatcher<Action>
  fetch: Fetch,
  configActions: ConfigActions,
  routeActions: RouteActions,
  graphActions: GraphActions,
  apiClient: ApiClient,
  graphManager: GraphManager,
  mapManager: MapManager,
  routeRetriever: RouteRetriever,
  configStore: ConfigStore,
  graphStore: GraphStore,
  routeStore: IRouteStore,
}

export default Ioc
