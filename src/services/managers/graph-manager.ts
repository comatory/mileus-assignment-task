import * as React from 'react'

import GraphActions from '../actions/graph-actions'
import GraphUtils from '../../utils/graph-utils'

export default class GraphManager {
  private _graphActions: GraphActions
  private _canvas: HTMLCanvasElement | null = null

  constructor(services: {
    graphActions: GraphActions,
  }) {
    this._graphActions = services.graphActions
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
