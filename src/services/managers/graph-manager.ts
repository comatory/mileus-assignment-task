import * as React from 'react'

import GraphActions from '../actions/graph-actions'
import GraphStore from '../stores/graph-store'
import GraphUtils from '../../utils/graph-utils'
import RouteUtils from '../../utils/route-utils'
import { IRouteStore } from '../../interfaces/stores'
import { play, pause, stop, reset } from '../../animation/graph-animation'

export const PAINT_RATE = 40

export default class GraphManager {
  private _graphActions: GraphActions
  private _graphStore: GraphStore
  private _routeStore: IRouteStore
  private _canvas: HTMLCanvasElement | null = null

  constructor(services: {
    graphActions: GraphActions,
    graphStore: GraphStore,
    routeStore: IRouteStore,
  }) {
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

    play(ctx, data, totalDistance)
  }

  public stop() {
    stop()
  }

  public pause() {
    pause()
  }

  public reset() {
    reset()
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
}
