import { Map, MapboxOptions } from 'mapbox-gl'
import { IAnimation } from './animation'
import { IRouteRetriever } from './retrievers'
import { IMapManager, IGraphManager } from './managers'
import { Segment } from '../interfaces/graph'
import { IGraphActions, IRouteActions, IMapActions, IConfigActions } from './actions'

export interface Services {
  configActions: IConfigActions,
  routeActions: IRouteActions,
  graphActions: IGraphActions,
  mapActions: IMapActions,

  animationFactory: (
    data: Array<Segment>,
    options: Partial<{
        multiplicationFactor: number,
    }>
  ) => IAnimation,

  graphManager: IGraphManager,
  mapManager: IMapManager,

  routeRetriever: IRouteRetriever,

  fetch: Fetch,
  mapFactory: (options: MapboxOptions) => Map,
}
