import * as React from 'react'

import GraphActions from '../actions/graph-actions'
import GraphStore from '../stores/graph-store'
import GraphUtils from '../../utils/graph-utils'
import RouteUtils from '../../utils/route-utils'
import { IRouteStore } from '../../interfaces/stores'
import { IAnimation, IAnimationFactory } from '../../interfaces/animation'
import { PlayState } from '../animation'

export const PAINT_RATE = 40

export default class GraphManager {
  private _animationFactory: IAnimationFactory
  private _graphActions: GraphActions
  private _graphStore: GraphStore
  private _routeStore: IRouteStore
  private _canvas: HTMLCanvasElement | null = null
  private _animation: IAnimation | null = null

  constructor(services: {
    animationFactory: IAnimationFactory,
    graphActions: GraphActions,
    graphStore: GraphStore,
    routeStore: IRouteStore,
  }) {
    this._animationFactory = services.animationFactory
    this._graphActions = services.graphActions
    this._graphStore = services.graphStore
    this._routeStore = services.routeStore
  }

  public registerPlayerGraphCanvas(ref: React.RefObject<HTMLCanvasElement> | null) {
    const graphCanvasRect = GraphUtils.getGraphGridDOMBounds()

    if (!graphCanvasRect && !ref) {
      console.warn('GraphManager#registerPlayerGraphCanvas -> Unable to detect DOM elements.')
      return
    }

    this._canvas = ref ? ref.current : null
    const {
      width,
      height,
      top,
      left,
      right,
      bottom,
    } = graphCanvasRect as DOMRectReadOnly
  
    this._matchCanvasSize(width, height)
    this._matchCanvasPosition({ top, left, right, bottom })
  }

  public unregisterPlayerGraphCanvas() {
    if (!this._canvas) {
      return
    }

    this._canvas.remove()
    this._canvas = null
  }

  public play() {
    const canvas = this._canvas
    if (!canvas) {
      return
    }

    const activeLegData = this._routeStore.getActiveLeg()
    
    if (!activeLegData) {
      return
    }

    const { annotation } = activeLegData
    const data = GraphUtils.parseAnnotation(annotation)

    const totalDistance = RouteUtils.getSumOfAllDistances(annotation)

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    if (!this._animation) {
      this._animation = this._animationFactory(data, totalDistance, ctx)
    }

    this._attachAnimationListeners(this._animation)
    this._animation.play()

    this._graphActions.playAnimation()
  }

  public stop() {
    if (!this._animation) {
      return
    }

    this._animation.stop()
    this._graphActions.pauseAnimation()
  }

  public pause() {
    if (!this._animation) {
      return
    }

    this._animation.pause()
    this._graphActions.pauseAnimation()
  }

  public reset() {
    if (!this._animation) {
      return
    }

    this._removeAnimationListeners(this._animation)

    this._animation.reset()
    this._animation = null

    this._graphActions.finishAnimation()
  }

  private _matchCanvasSize(width: number, height: number) {
    if (!this._canvas) {
      return
    }

    this._canvas.width = width
    this._canvas.height = height
  }

  private _matchCanvasPosition({
    top,
    left,
    right,
    bottom,
  }: { top: number, left: number, right: number, bottom: number }) {
    if (!this._canvas) {
      return
    }

    this._canvas.style.top = `${top}px`
    this._canvas.style.bottom = `${bottom}px`
    this._canvas.style.left = `${left}px`
    this._canvas.style.right = `${right}px`
  }

  private _attachAnimationListeners(animation: IAnimation) {
    animation.addListener(PlayState.Finished, this._setAnimationAsFinished)
  }

  private _removeAnimationListeners(animation: IAnimation) {
    animation.removeListener(PlayState.Finished, () => this._setAnimationAsFinished)
  }

  private _setAnimationAsFinished = () => {
    this._graphActions.finishAnimation()
  }
}
