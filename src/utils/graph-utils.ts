import { Route, RouteResponse, Annotation } from '../interfaces/route'
import { Graph, Segment, Animation } from '../interfaces/graph'
import { ACTIVE_LEG } from '../services/managers/map-manager'

export default class GraphUtils {
  // NOTE: This util is unused but would be used for extracting muliple routes & legs
  static _parseGraphData(rawData: RouteResponse) {
    return rawData.routes
      .map((route) => route.legs)
      .map((legs) => legs.map((leg) => leg.annotation))
      .map(GraphUtils._parseAnnotations)
  }

  static _parseAnnotations = (annotations: Array<Annotation>) => {
    return annotations.map(GraphUtils.parseAnnotation)
  }

  static parseAnnotation = (annotation: Annotation): Array<Segment> => {
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
          timestamp: index === 0 ? now : GraphUtils.addTimestamps(previousTimestamp, duration[index])
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
      segments: GraphUtils.parseAnnotation(annotation),
    }
  }

  static convertToKmH(speed: number): number {
    return (speed * 60 * 60 * 0.001)
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

  static parseSegmentsToAnimationData(graphData: Graph, width: number): Animation {
    const segments = graphData.segments
    const totalDistance = graphData.distance

    return segments.reduce((acc: Animation, segment: Segment) => {
      const ratio = segment.distance / totalDistance
      return {
        ...acc,
        durationsInMs: [
          ...acc.durationsInMs,
          segment.duration * 1000 // convert to miliseconds,
        ],
        distancesInPx: [
          ...acc.distancesInPx,
          width * ratio,
        ],
      }
    }, {
      distancesInPx: [],
      durationsInMs: [],
    })
  }
}
