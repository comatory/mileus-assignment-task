import { Ioc } from '@adonisjs/fold'

import Animation from '../services/animation/animation'
import { IAnimation } from '../interfaces/animation'
import { Segment } from '../interfaces/graph'

import { Services } from '../interfaces/services'

export default (ioc: Ioc<Services>) => {
  ioc.bind('animationFactory', (_) => {
    return (
      data: Array<Segment>,
      options: Partial<{
        multiplicationFactor: number,
      }> = {},
    ): IAnimation => {
      return new Animation(data, options)
    }
  })

  return {
    animationFactory: ioc.use('animationFactory'),
  }
}

