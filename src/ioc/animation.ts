// @ts-ignore: Unfortunately lib does not have type definitions
//             and DefinitelyTyped packages does not exist
import Ioc, { ioc } from '@adonisjs/fold'

import Animation from '../services/animation'
import { IAnimation } from '../interfaces/animation'
import { Segment } from '../interfaces/graph'

ioc.bind('animationFactory', (_app: Ioc) => {
  return (
    data: Array<Segment>,
    totalDistance: number,
    ctx: CanvasRenderingContext2D
  ): IAnimation => {
    return new Animation(data, totalDistance, ctx)
  }
})

export default {
  animationFactory: ioc.use('animationFactory'),
}
