import { Ioc } from '@adonisjs/fold'
import { Dispatcher } from 'flux'
import { Map, MapboxOptions } from 'mapbox-gl'

import { Action } from '../interfaces/stores'
import { Services } from '../interfaces/services'

export default (ioc: Ioc<Services>) => {

  ioc.singleton('dispatcher', () => {
    return new Dispatcher<Action>()
  })

  ioc.bind('mapFactory', () => {
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

  ioc.singleton('fetch', () => fetch)

  return {
    dispatcher: ioc.use('dispatcher'),
    fetch,
    mapFactory: ioc.use('mapFactory'),
  }
}
