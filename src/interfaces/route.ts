import { ResponseDescriptor } from '../interfaces/apis'
export type GeometryCoordinate = [ number, number ]

export interface Geometry {
  coordinates: Array<GeometryCoordinate>
  type: string,
}

export interface Annotation {
  distance: Array<number>,
  duration: Array<number>,
  speed: Array<number>,
}

export interface Leg {
  annotation: Annotation,
  distance: number,
  duration: number,
  steps: Array<any>,
  summary: string,
  weight: number,
}

export interface Route {
  distance: number,
  duration: number,
  weight: number,
  weight_name: string,
  geometry: Geometry,
  legs: Array<Leg>
}

export type ApiResponseCode = (
  'Ok' |
  'InvalidUrl' |
  'InvalidService' |
  'InvalidVersion' |
  'InvalidOptions' |
  'InvalidQuery' |
  'InvalidValue' |
  'NoSegment' |
  'TooBig'
)

export interface RouteResponse extends ResponseDescriptor {
  code: ApiResponseCode,
  routes: Array<Route>,
  waypoints: Array<{
    hint: string,
    location: [ number, number ],
    name: string,
  }>,
  error: string | null,
  responseText: string,
  statusCode: number,
}

export interface Feature {
  type: 'Feature',
  properties: {
    color: string,
  },
  geometry: {
    type: 'LineString',
    coordinates: Array<[ number, number ]>,
  }
}
