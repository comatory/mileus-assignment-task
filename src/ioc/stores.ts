import { Ioc } from '@adonisjs/fold'

import {
  ConfigStore,
  RouteStore,
  GraphStore,
  MapStore,
} from '../services/stores'

import { Services } from '../interfaces/services'

export default (ioc: Ioc<Services>) => {
  ioc.singleton('configStore', () => {
    return new ConfigStore({
      dispatcher: ioc.use('dispatcher'),
    })
  })

  ioc.singleton('routeStore', () => {
    return new RouteStore({
      dispatcher: ioc.use('dispatcher'),
    })
  })

  ioc.singleton('graphStore', () => {
    return new GraphStore({
      dispatcher: ioc.use('dispatcher'),
    })
  })

  ioc.singleton('mapStore', () => {
    return new MapStore({
      dispatcher: ioc.use('dispatcher'),
    })
  })

  return {
    configStore: ioc.use('configStore'),
    graphStore: ioc.use('graphStore'),
    routeStore: ioc.use('routeStore'),
    mapStore: ioc.use('mapStore'),
  }
}

