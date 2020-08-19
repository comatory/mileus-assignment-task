// @ts-ignore: Unfortunately lib does not have type definitions
//             and DefinitelyTyped packages does not exist
import { ioc } from '@adonisjs/fold'

import vendor from './vendor'
import { ConfigStore, RouteStore } from '../services/stores'

ioc.singleton('configStore', () => {
  return new ConfigStore({
    dispatcher: vendor.dispatcher,
  })
})

ioc.singleton('routeStore', () => {
  return new RouteStore({
    dispatcher: vendor.dispatcher,
  })
})

export default {
  configStore: ioc.use('configStore'),
  routeStore: ioc.use('routeStore'),
}

