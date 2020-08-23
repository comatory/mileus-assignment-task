import { MapboxOptions, Map } from 'mapbox-gl'


let map: Map

export default () => {
  return (options: MapboxOptions) => {
    if (map) {
      return map
    }
    map = new Map(options)
    return map
  }
}

export const getMap = () => map
