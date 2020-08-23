// @ts-ignore: Unfortunately lib does not have type definitions
//             and DefinitelyTyped packages does not exist
import { ioc } from '@adonisjs/fold'

import { GraphManager, MapManager } from '../services/managers'
import actions from './actions'
import retrievers from './retrievers'
import stores from './stores'
import vendor from './vendor'
import animation from './animation'

ioc.singleton('mapManager', () => {
  return new MapManager({
    graphActions: actions.graphActions,
    mapFactory: vendor.mapFactory,
    routeActions: actions.routeActions,
    routeRetriever: retrievers.routeRetriever,
    routeStore: stores.routeStore,
  })
})

ioc.singleton('graphManager', () => {
  return new GraphManager({
    animationFactory: animation.animationFactory,
    graphActions: actions.graphActions,
    graphStore: stores.graphStore,
    routeStore: stores.routeStore,
  })
})

export default {
  graphManager: ioc.use('graphManager'),
  mapManager: ioc.use('mapManager'),
}
