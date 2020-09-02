import { Ioc } from '@adonisjs/fold'

import { GraphManager, MapManager } from '../services/managers'

import { Services } from '../interfaces/services'

export default (ioc: Ioc<Services>) => {
  ioc.singleton('mapManager', () => {
    return new MapManager({
      graphActions: ioc.use('graphActions'),
      mapActions: ioc.use('mapActions'),
      mapFactory: ioc.use('mapFactory'),
      mapStore: ioc.use('mapStore'),
      routeActions: ioc.use('routeActions'),
      routeRetriever: ioc.use('routeRetriever'),
      routeStore: ioc.use('routeStore'),
    })
  })

  ioc.singleton('graphManager', () => {
    return new GraphManager({
      animationFactory: ioc.use('animationFactory'),
      graphActions: ioc.use('graphActions'),
      graphStore: ioc.use('graphStore'),
      mapStore: ioc.use('mapStore'),
      routeStore: ioc.use('routeStore'),
    })
  })

  return {
    graphManager: ioc.use('graphManager'),
    mapManager: ioc.use('mapManager'),
  }
}

