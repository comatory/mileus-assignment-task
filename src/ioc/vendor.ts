// @ts-ignore: Unfortunately lib does not have type definitions
//             and DefinitelyTyped packages does not exist
import { ioc } from '@adonisjs/fold'
import { Dispatcher } from 'flux'

import { Action } from '../interfaces/stores'

ioc.singleton('dispatcher', () => {
  return new Dispatcher<Action>()
})

const fetch = window.fetch.bind(window)

export default {
  dispatcher: ioc.use('dispatcher'),
  fetch,
}

