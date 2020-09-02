import {
  ConfigActions,
  RouteActions,
  GraphActions,
  MapActions,
} from '../services/actions'
import {
  GraphStore,
  ConfigStore,
  RouteStore,
  MapStore,
} from '../services/stores'
import { IAnimation } from './animation'
import { IRouteRetriever } from './retrievers'
import { IMapManager, IGraphManager } from './managers'

export interface Services {
  configActions: ConfigActions,
  routeActions: RouteActions,
  graphActions: GraphActions,
  mapActions: MapActions,

  animationFactory: () => IAnimation,

  graphManager: IGraphManager,
  mapManager: IMapManager,

  routeRetriever: IRouteRetriever,

  configStore: ConfigStore,
  graphStore: GraphStore,
  routeStore: RouteStore,
  mapStore: MapStore,
}
