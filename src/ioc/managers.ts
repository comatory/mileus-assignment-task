// @ts-ignore: Unfortunately lib does not have type definitions
//             and DefinitelyTyped packages does not exist
import { ioc } from '@adonisjs/fold'

import { MapManager } from '../services/managers'

ioc.singleton('mapManager', () => {
  return new MapManager()
})

export default {
  mapManager: ioc.use('mapManager'),
}
