// @ts-ignore: Unfortunately lib does not have type definitions
//             and DefinitelyTyped packages does not exist
import Ioc, { ioc } from '@adonisjs/fold'
import { Dispatcher } from 'flux'
import { Map, MapboxOptions } from 'mapbox-gl'

import { Action } from '../interfaces/stores'

ioc.singleton('dispatcher', () => {
  return new Dispatcher<Action>()
})

ioc.bind('mapFactory', (_app: Ioc) => {
  let map: Map

  return (options: MapboxOptions) => {
    if (map) {
      return map
    }
    map = new Map(options)
    return map
  }
})

const fetch = window.fetch.bind(window)

export default {
  dispatcher: ioc.use('dispatcher'),
  fetch,
  mapFactory: ioc.use('mapFactory'),
}

