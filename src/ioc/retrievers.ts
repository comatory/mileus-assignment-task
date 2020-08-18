// @ts-ignore: Unfortunately lib does not have type definitions
//             and DefinitelyTyped packages does not exist
import { ioc } from '@adonisjs/fold'

import { RouteRetriever } from '../services/retrievers'
import apis from './apis'

ioc.singleton('routeRetriever', () => {
  return new RouteRetriever({
    apiClient: apis.apiClient,
  })
})

export default {
  routeRetriever: ioc.use('routeRetriever'),
}

