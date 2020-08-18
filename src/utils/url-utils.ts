import { LngLat } from 'mapbox-gl'

export default class UrlUtils {
  static createOSRMUrl(origin: LngLat, destination: LngLat): string {
    const formattedOrigin = `${origin.lng},${origin.lat}`
    const formattedDestination = `${destination.lng},${destination.lat}`

    return `https://router.project-osrm.org/route/v1/driving/${formattedOrigin};${formattedDestination}?overview=full&geometries=geojson&annotations=duration,distance,speed`

  }
}
