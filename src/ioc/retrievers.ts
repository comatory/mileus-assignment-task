import { Ioc } from '@adonisjs/fold'

import { RouteRetriever } from '../services/retrievers'
import { Services } from '../interfaces/services'

export default (ioc: Ioc<Services>) => {
  ioc.singleton('routeRetriever', () => {
    return new RouteRetriever({
      apiClient: ioc.use('apiClient'),
    })
  })

  return {
    routeRetriever: ioc.use('routeRetriever'),
  }
}

