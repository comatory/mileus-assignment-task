import { Ioc } from '@adonisjs/fold'

import {
  ConfigActions,
  RouteActions,
  GraphActions,
  MapActions,
} from '../services/actions'

import { Services } from '../interfaces/services'

export default (ioc: Ioc<Services>) => {
  ioc.singleton('configActions', () => {
    return new ConfigActions({
      dispatcher: ioc.use('dispatcher'),
    })
  })

  ioc.singleton('routeActions', () => {
    return new RouteActions({
      dispatcher: ioc.use('dispatcher'),
    })
  })

  ioc.singleton('graphActions', () => {
    return new GraphActions({
      dispatcher: ioc.use('dispatcher'),
    })
  })

  ioc.singleton('mapActions', () => {
    return new MapActions({
      dispatcher: ioc.use('dispatcher'),
    })
  })

  return {
    configActions: ioc.use('configActions'),
    routeActions: ioc.use('routeActions'),
    graphActions: ioc.use('graphActions'),
    mapActions: ioc.use('mapActions'),
  }
}

