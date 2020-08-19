import * as React from 'react'

import GraphActions from '../actions/graph-actions'
import GraphStore from '../stores/graph-store'
import GraphUtils from '../../utils/graph-utils'
import PlayerAnimation from '../../entities/player-animation'

export const PAINT_RATE = 40

export default class GraphManager {
  private _graphActions: GraphActions
  private _graphStore: GraphStore
  private _canvas: HTMLCanvasElement | null = null
  private _animation: PlayerAnimation | null = null
  private _timer: number | null = null
  private _animationRequestId: number | null = null

  constructor(services: {
    graphActions: GraphActions,
    graphStore: GraphStore,
  }) {
    this._graphActions = services.graphActions
    this._graphStore = services.graphStore
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

    const graphData = this._graphStore.getGraphData()
    
    if (!graphData) {
      return
    }

    const width = canvas.width
    const animationData = GraphUtils.parseSegmentsToAnimationData(graphData, width)

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    this._animation = new PlayerAnimation(ctx, animationData.durationsInMs, animationData.distancesInPx)

    this._timer = window.setInterval(() => {
      if (!this._animation) {
        return
      }
      this._animationRequestId = window.requestAnimationFrame(this._animation.play)
    }, PAINT_RATE)

    window.setTimeout(() => {
      this._timer && window.clearInterval(this._timer)
    }, graphData.duration * 1000)
  }

  public stop() {
    if (this._timer) {
      window.clearInterval(this._timer)
    }
    this._animation = null
    if (this._animationRequestId) {
      window.cancelAnimationFrame(this._animationRequestId)
    }
    this._animationRequestId = null
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
