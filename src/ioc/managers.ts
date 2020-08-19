// @ts-ignore: Unfortunately lib does not have type definitions
//             and DefinitelyTyped packages does not exist
import { ioc } from '@adonisjs/fold'

import { MapManager } from '../services/managers'
import actions from './actions'

ioc.singleton('mapManager', () => {
  return new MapManager({
    routeActions: actions.routeActions,
  })
})

export default {
  mapManager: ioc.use('mapManager'),
}
