// @ts-ignore: Unfortunately lib does not have type definitions
//             and DefinitelyTyped packages does not exist
import { ioc } from '@adonisjs/fold'

import vendor from './vendor'
import { ConfigActions, RouteActions } from '../services/actions'

ioc.singleton('configActions', () => {
  return new ConfigActions({
    dispatcher: vendor.dispatcher,
  })
})

ioc.singleton('routeActions', () => {
  return new RouteActions({
    dispatcher: vendor.dispatcher,
  })
})

export default {
  configActions: ioc.use('configActions'),
  routeActions: ioc.use('routeActions'),
}
