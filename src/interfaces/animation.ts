import { EventEmitter } from 'events'
import { Segment } from './graph'
import { GeometryCoordinate } from './route'

export interface IAnimation extends EventEmitter {
  play: () => void,
  pause: () => void,
  stop: () => void,
  reset: () => void,
  registerPaintCallback: (callback: (data: AnimationPayload) => void) => void,
  registerResetCallback: (callback: (data: { timestamp: number }) => void) => void,
  unregisterAllCallbacks: () => void,
}

export type IAnimationFactory = (
  data: Array<Segment>,
  options: Partial<{
    multiplicationFactor: number,
  }>,
) => IAnimation

export interface AnimationPayload {
  distance: number,
  duration: number,
  paintDelta: number,
  coordinates: GeometryCoordinate,
  nextCoordinates: GeometryCoordinate | null,
}
