import * as React from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { RootState } from '../../../interfaces/state'
import { Services } from '../../../interfaces/services'
import GraphUtils from '../../../utils/graph-utils'
import RouteUtils from '../../../utils/route-utils'
import { PlayState } from '../../../services/animation/animation'
import GraphAnimation from '../../../services/animation/graph-animation'
import MapAnimation from '../../../services/animation/map-animation'
import { IAnimation } from '../../../interfaces/animation'

import {
  registerCanvas,
  unregisterCanvas,
  playAnimation,
  pauseAnimation,
  finishAnimation,
} from './graph-action-creators'

let animation: IAnimation | null = null

export const registerPlayerGraphCanvas = (ref: React.RefObject<HTMLCanvasElement> | null) => {
  return (dispatch: ThunkDispatch<RootState, Services, AnyAction>) => {
    const graphCanvasRect = GraphUtils.getGraphGridDOMBounds()

      if (!graphCanvasRect && !ref) {
        console.warn('GraphManager#registerPlayerGraphCanvas -> Unable to detect DOM elements.')
        return
      }

      const canvas = ref ? ref.current : null

      if (!canvas) {
        return
      }

      const {
        width,
        height,
        top,
        left,
        right,
        bottom,
      } = graphCanvasRect as DOMRectReadOnly
    
      canvas.width = width
      canvas.height = height

      canvas.style.top = `${top}px`
      canvas.style.bottom = `${bottom}px`
      canvas.style.left = `${left}px`
      canvas.style.right = `${right}px`

      dispatch(registerCanvas(canvas))
  }
}

export const unregisterPlayerGraphCanvas = () => {
  return (dispatch: ThunkDispatch<RootState, Services, AnyAction>, getState: () => RootState) => {
    const canvas = getState().graph.canvas

    if (!canvas) {
      return
    }

    canvas.remove()

    dispatch(unregisterCanvas())
  }
}

const setAnimationAsFinished = (dispatch: ThunkDispatch<RootState, Services, AnyAction>) => {
  dispatch(finishAnimation())
}

export const play = () => {
  return (
    dispatch: ThunkDispatch<RootState, Services, AnyAction>,
    getState: () => RootState,
    services: Services
  ) => {
    const canvas = getState().graph.canvas

    if (!canvas) {
      return
    }

    const activeRoute = getState().route.routes[0]
    const activeLegData = activeRoute.legs[0]
    const map = getState().map.map
    
    if (!activeLegData || !activeRoute || !map) {
      return
    }

    const { annotation } = activeLegData
    const { geometry } = activeRoute
    const { coordinates } = geometry
    const data = GraphUtils.parseAnnotation(annotation, coordinates)
    const totalDistance = RouteUtils.getSumOfAllDistances(annotation)
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const multiplicationFactor = getState().graph.multiplication

    if (!animation) {
      animation = services.animationFactory(
        data, {
          multiplicationFactor,
        }
      )
      const graphAnimation = new GraphAnimation(ctx, totalDistance)
      const mapAnimation = new MapAnimation(map, coordinates[0])

      animation.registerPaintCallback(graphAnimation.update)
      animation.registerPaintCallback(mapAnimation.update)
      animation.registerResetCallback(graphAnimation.reset)
      animation.registerResetCallback(mapAnimation.reset)

      animation.addListener(PlayState.Finished, () => setAnimationAsFinished(dispatch))
    }

    animation.play()

    dispatch(playAnimation())
  }
}

export const stop = () => {
  return (dispatch: ThunkDispatch<RootState, Services, AnyAction>) => {
    if (!animation) {
      return
    }

    animation.stop()
    dispatch(pauseAnimation())
  }
}

export const pause = () => {
  return (dispatch: ThunkDispatch<RootState, Services, AnyAction>) => {
    if (!animation) {
      return
    }

    animation.pause()

    dispatch(pauseAnimation())
  }
}

export const reset = () => {
  return (dispatch: ThunkDispatch<RootState, Services, AnyAction>) => {
    if (!animation) {
      return
    }

    animation.removeListener(PlayState.Finished, () => setAnimationAsFinished(dispatch))

    animation.unregisterAllCallbacks()

    animation.reset()
    animation = null

    dispatch(finishAnimation())
  }
}
