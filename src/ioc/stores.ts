// @ts-ignore: Unfortunately lib does not have type definitions
//             and DefinitelyTyped packages does not exist
import { ioc } from '@adonisjs/fold'

import vendor from './vendor'
import {
  ConfigStore,
  RouteStore,
  GraphStore,
  MapStore,
} from '../services/stores'

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

ioc.singleton('graphStore', () => {
  return new GraphStore({
    dispatcher: vendor.dispatcher,
  })
})

ioc.singleton('mapStore', () => {
  return new MapStore({
    dispatcher: vendor.dispatcher,
  })
})

export default {
  configStore: ioc.use('configStore'),
  graphStore: ioc.use('graphStore'),
  routeStore: ioc.use('routeStore'),
  mapStore: ioc.use('mapStore'),
}

