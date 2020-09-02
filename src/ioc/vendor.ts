import { Ioc } from '@adonisjs/fold'
import { Map, MapboxOptions } from 'mapbox-gl'

import { Services } from '../interfaces/services'

export default (ioc: Ioc<Services>) => {

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
    fetch,
    mapFactory: ioc.use('mapFactory'),
  }
}
