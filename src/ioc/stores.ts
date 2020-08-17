// @ts-ignore: Unfortunately lib does not have type definitions
//             and DefinitelyTyped packages does not exist
import { ioc } from '@adonisjs/fold'

import vendor from './vendor'
import ConfigStore from '../services/stores/config-store'

ioc.singleton('configStore', () => {
  return new ConfigStore({
    dispatcher: vendor.dispatcher,
  })
})

export default {
  configStore: ioc.use('configStore'),
}

