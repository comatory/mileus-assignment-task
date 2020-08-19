import { LngLat } from 'mapbox-gl'

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
}
