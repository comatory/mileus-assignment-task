// @ts-ignore: Unfortunately lib does not have type definitions
//             and DefinitelyTyped packages does not exist
import { ioc } from '@adonisjs/fold'

import { MapManager } from '../services/managers'
import actions from './actions'
import retrievers from './retrievers'

ioc.singleton('mapManager', () => {
  return new MapManager({
    routeActions: actions.routeActions,
    routeRetriever: retrievers.routeRetriever,
  })
})

export default {
  mapManager: ioc.use('mapManager'),
}
