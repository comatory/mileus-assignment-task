import { Ioc } from '@adonisjs/fold'
import ApiClient from '../services/api-client'

import { Services } from '../interfaces/services'

export default (ioc: Ioc<Services>) => {
  ioc.singleton('apiClient', () => {
    return new ApiClient({
      fetch: ioc.use('fetch'),
    })
  })

  return {
    apiClient: ioc.use('apiClient')
  }
}

