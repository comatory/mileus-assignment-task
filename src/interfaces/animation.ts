import { EventEmitter } from 'events'
import { Segment } from './graph'

export interface IAnimation extends EventEmitter {
  play: () => void,
  pause: () => void,
  stop: () => void,
  reset: () => void,
}

export type IAnimationFactory = (
  data: Array<Segment>,
  totalDistance: number,
  ctx: CanvasRenderingContext2D,
  options: Partial<{
    multiplicationFactor: number,
  }>,
) => IAnimation
