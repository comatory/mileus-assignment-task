import { MapboxOptions, Map } from 'mapbox-gl'

export default (map: Map): (options: MapboxOptions) => Map => {
  return (_options: MapboxOptions) => {
    return map
  }
}
