import { EventEmitter } from 'events'

import { IAnimation } from '../interfaces/animation'
import { Segment } from '../interfaces/graph'

const FALLBACK_REFRESH_RATE_IN_MILISECONDS = 16.6
const DEFAULT_PLAYING_EMIT_RATE_IN_MILISECONDS = 100

export enum PlayState {
  Playing = 'Playing',
  Paused = 'Paused',
  Stopped = 'Stopped',
  Finished = 'Finished',
}

export default class Animation extends EventEmitter implements IAnimation {
  private _index: number = 0
  private _x: number = 0
  private _width: number
  private _height: number
  private _prevTimestamp: number | null = null
  private _prevSegmentTimestamp: number | null = null
  private _startTime: number | null = null
  private _pauseTime: number | null = null
  private _pauses: number | null = null
  private _isPlaying: boolean = false
  private _totalDistance: number

  private _id: number | null = null
  private _ctx: CanvasRenderingContext2D
  private _data: Array<Segment>

  private _emitRate: number = DEFAULT_PLAYING_EMIT_RATE_IN_MILISECONDS

  constructor(
    data: Array<Segment>,
    totalDistance: number,
    ctx: CanvasRenderingContext2D
  ) {
    super()
    this._data = data
    this._ctx = ctx

    this._width = ctx.canvas.width
    this._height = ctx.canvas.height
    this._totalDistance = totalDistance
  }

  private _draw = (timestamp: number) => {
    this.emit(PlayState.Playing, { timestamp, x: this._x })

    timestamp = (this._pauses !== null) ?
      timestamp - this._pauses :
      timestamp

    console.log(this._x)
    if (this._index > this._data.length) {
      this._id && window.cancelAnimationFrame(this._id)
      this._id = null

      if (this._prevTimestamp !== null && timestamp - this._prevTimestamp > this._emitRate) {
        this.emit(PlayState.Finished, { x: this._x })
      }

      this.reset()
      return
    }

    if (this._prevSegmentTimestamp === null) {
      this._prevSegmentTimestamp = timestamp
    }

    const segmentTimeDelta = timestamp - this._prevSegmentTimestamp

    const prevDuration = this._data[this._index]['duration'] * 1000
    if (segmentTimeDelta > prevDuration) {
      this._prevSegmentTimestamp = timestamp

      this._index += 1
    }

    const duration = this._data[this._index] ? this._data[this._index]['duration'] * 1000 : null
    const distance = this._data[this._index] ? this._data[this._index]['distance'] : null

    if (distance === null || duration === null ) {
      this._id && window.cancelAnimationFrame(this._id)
      this._id = null
      this.emit(PlayState.Finished, { x: this._x })
      this.reset()
      return
    }

    const paintDelta = this._prevTimestamp === null ?
      FALLBACK_REFRESH_RATE_IN_MILISECONDS :
      (timestamp - this._prevTimestamp)
    const ratio = (distance / this._totalDistance)
    const distanceInPx = ratio * this._width
    const step = distanceInPx / (duration / paintDelta)

    this._prevTimestamp = timestamp
    this._x += step

    this._ctx.clearRect(0, 0, this._width, this._height)

    this._ctx.strokeStyle = "limegreen"
    this._ctx.lineWidth = 1
    this._ctx.beginPath()
    this._ctx.moveTo(this._x, 0)
    this._ctx.lineTo(this._x, 500)
    this._ctx.stroke()

    this._id = window.requestAnimationFrame(this._draw)
  }

  public reset = () => {
    this._index = 0
    this._x = 0
    this._prevTimestamp = null
    this._prevSegmentTimestamp = null
    this._startTime = null
    this._pauseTime = null
    this._pauses = null
    this._isPlaying = false
  }

  public play = () => {
    this._isPlaying = true
    this._startTime = performance.now()

    const pauseTime = this._pauseTime

    const savedPauses = (
      pauseTime !== null &&
      this._startTime !== null
    ) ?
      (this._startTime - pauseTime) :
      null

    this._pauses = savedPauses
    console.info(this._pauses)
    this._id = window.requestAnimationFrame(this._draw)
  }

  public pause = () => {
    this._isPlaying = false
    this._pauseTime = performance.now()
    this._id && window.cancelAnimationFrame(this._id)
    this._id = null

    this.emit(PlayState.Paused, { x: this._x })
  }

  public stop = () => {
    this._ctx.clearRect(0, 0, this._width, this._height)

    this._id && window.cancelAnimationFrame(this._id)
    this._id = null

    this.emit(PlayState.Stopped, { x: this._x })

    this.reset()
  }
}
