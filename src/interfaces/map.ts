import { Map, MapboxOptions } from 'mapbox-gl'

export type IMapFactory = (options: MapboxOptions) => Map
