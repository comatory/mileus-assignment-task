import { Map, MapboxOptions } from 'mapbox-gl'
import { IAnimation } from './animation'
import { IRouteRetriever } from './retrievers'
import { IMapManager, IGraphManager } from './managers'
import { Segment } from '../interfaces/graph'

export interface Services {
  configActions: any,
  routeActions: any,
  graphActions: any,
  mapActions: any,

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
