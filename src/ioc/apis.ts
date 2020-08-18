// @ts-ignore: Unfortunately lib does not have type definitions
//             and DefinitelyTyped packages does not exist
import { ioc } from '@adonisjs/fold'
import ApiClient from '../services/api-client'

import vendor from './vendor'

ioc.singleton('apiClient', () => {
  return new ApiClient({
    fetch: vendor.fetch,
  })
})

export default {
  apiClient: ioc.use('apiClient')
}

