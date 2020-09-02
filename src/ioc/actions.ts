import { Ioc } from '@adonisjs/fold'

import * as configActions from '../services/actions/config'
import * as routeActions from '../services/actions/route'
import * as graphActions from '../services/actions/graph'
import * as mapActions from '../services/actions/map'

import { Services } from '../interfaces/services'

export default (ioc: Ioc<Services>) => {
  ioc.singleton('configActions', () => {
    return configActions
  })

  ioc.singleton('routeActions', () => {
    return routeActions
  })

  ioc.singleton('graphActions', () => {
    return graphActions
  })

  ioc.singleton('mapActions', () => {
    return mapActions
  })

  return {
    configActions: ioc.use('configActions'),
    routeActions: ioc.use('routeActions'),
    graphActions: ioc.use('graphActions'),
    mapActions: ioc.use('mapActions'),
  }
}

