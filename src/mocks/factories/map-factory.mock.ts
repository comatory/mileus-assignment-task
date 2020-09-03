import mapbox, { MapboxOptions, Map } from 'mapbox-gl'


let map: Map

const mockMapFactory = () => {
  mapbox.accessToken = 'test'

  return (options: MapboxOptions) => {
    if (map) {
      return map
    }
    map = new Map(options)
    return map
  }
}

export default mockMapFactory

export const getMap = () => map
