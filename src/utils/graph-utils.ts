import { Route, Annotation, GeometryCoordinate } from '../interfaces/route'
import { Graph, Segment } from '../interfaces/graph'
import { ACTIVE_LEG } from '../constants'

export default class GraphUtils {
  static parseAnnotation = (
    annotation: Annotation,
    coordinates: Array<GeometryCoordinate>
  ): Array<Segment> => {
    const { distance, duration, speed } = annotation

    const now = (new Date()).getTime()

    const items = distance.reduce((list: Array<Segment>, _unit: number, index: number) => {
      const previousTimestamp = list[index - 1] ? list[index - 1].timestamp : null

      return [
        ...list,
        {
          distance: distance[index],
          duration: duration[index],
          speed: speed[index],
          speedInKm: GraphUtils.convertToKmH(speed[index]),
          timestamp: index === 0 ? now : GraphUtils.addTimestamps(previousTimestamp, duration[index]),
          coordinates: coordinates[index],
        }
      ]
    }, [])

    return items
  }

  static createGraph(route: Route): Graph {
    const annotation = route.legs[ACTIVE_LEG].annotation
    return {
      distance: route.distance,
      duration: route.duration,
      segments: GraphUtils.parseAnnotation(
        annotation,
        route.geometry.coordinates
      ),
    }
  }

  static convertToKmH(speed: number): number {
    return (speed * 60 * 60 * 0.001)
  }

  static convertToKm(distanceInMeters: number): number {
    return distanceInMeters / 1000
  }

  static convertToHoursAndMinutes(durationsSeconds: number): string {
    const minutes = Math.floor((durationsSeconds / 60) % 60)
    const hours = Math.floor((durationsSeconds / (60 * 60)) % 24)

    const prefixedHours = (hours < 10) ? "0" + hours : hours;
    const prefixedMinutes = (minutes < 10) ? "0" + minutes : minutes;

    return [ prefixedHours, prefixedMinutes ].join(':')
  }

  static addTimestamps(prevTimestamp: number | null, duration: number): number {
    if (!prevTimestamp) {
      return 0
    }
    return prevTimestamp + (duration * 1000)
  }

  static getGraphGridDOMBounds(): DOMRectReadOnly | null {
    const grids = document.getElementsByClassName('recharts-cartesian-grid')
    const grid = grids && grids.length > 0 ? grids[0] : null

    if (!grid) {
      return null
    }

    return grid.getBoundingClientRect()
  }
}
