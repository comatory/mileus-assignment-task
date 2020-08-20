import { LngLat } from 'mapbox-gl'

import { Route, Feature } from '../interfaces/route'
import { ACTIVE_LEG } from '../services/managers/map-manager'

const DEFAULT_FEATURE_TYPE = 'Feature'
const DEFAULT_FEATURE_GEOMETRY = 'LineString'

enum SpeedColor {
  Standing = 'crimson',
  VerySlow = 'coral',
  Slow = 'orange',
  Slower = 'gold',
  Normal = 'green',
  Faster = 'yellowgreen',
  Fast = 'lightgreen',
  Blazing = 'springgreen',
}

export default class RouteUtils {
  static convertStringToLngLat(text: string): LngLat {
    const [ lng, lat ] = text.split(',').map((str) => parseFloat(str.trim()))

    return new LngLat(lng, lat)
  }

  static convertLngLatToString(lngLat: LngLat | null): string {
    const lng = lngLat ? lngLat.lng : ''
    const lat = lngLat ? lngLat.lat : ''

    return (lng && lat) ? ([ lng, lat ]).join(', ') : ''
  }

  static doesLngLatObjectsEqual(firstLngLat: LngLat, secondLngLat: LngLat): boolean {
    return (
      firstLngLat.lng === secondLngLat.lng &&
      firstLngLat.lat === secondLngLat.lat
    )
  }

  static getCoordinateSpeedColor(speed: number): string {
    if (speed === 0) {
      return SpeedColor.Standing
    } else if (speed > 0 && speed < 7) {
      return SpeedColor.VerySlow
    } else if (speed > 7 && speed < 13) {
      return SpeedColor.Slow
    } else if (speed > 13 && speed < 16) {
      return SpeedColor.Slower
    } else if (speed > 16 && speed < 19) {
      return SpeedColor.Normal
    } else if (speed > 19 && speed < 24) {
      return SpeedColor.Faster
    } else if (speed > 24 && speed < 30) {
      return SpeedColor.Fast
    }

    return SpeedColor.Blazing
  }

  static createRouteFeatures(route: Route): Array<Feature> {
    const leg = route.legs[ACTIVE_LEG]
    const { annotation } = leg
    const { speed } = annotation

    return route.geometry.coordinates.reduce((
      list: Array<Feature>,
      coordinate: [ number, number ],
      index: number,
      array: Array<[ number, number ]>
    ): Array<Feature> => {
      const prevCoordinate = array[index - 1] || coordinate
      const coordinateSpeed = speed[index]
      const color = RouteUtils.getCoordinateSpeedColor(coordinateSpeed)
      //const color = '#F7455D'

      return [
        ...list,
        {
          type: DEFAULT_FEATURE_TYPE,
          properties: {
            color,
          },
          geometry: {
            type: DEFAULT_FEATURE_GEOMETRY,
            coordinates: [ prevCoordinate, coordinate ],
          }
        },
      ]
    }, [])
  }
}
