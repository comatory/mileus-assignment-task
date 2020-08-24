import { EventEmitter } from 'events'

import { IAnimation, AnimationPayload } from '../../interfaces/animation'
import { Segment } from '../../interfaces/graph'
import { DEFAULT_MULTIPLICATION_FACTOR } from '../../constants'

const FALLBACK_REFRESH_RATE_IN_MILISECONDS = 16.6

export enum PlayState {
  Playing = 'Playing',
  Paused = 'Paused',
  Stopped = 'Stopped',
  Finished = 'Finished',
}

export default class Animation extends EventEmitter implements IAnimation {
  private _index: number = 0
  private _prevTimestamp: number | null = null
  private _prevSegmentTimestamp: number | null = null
  private _startTime: number | null = null
  private _pauseTime: number | null = null
  private _pauses: number | null = null
  private _isPlaying: boolean = false
  private _multiplicationFactor: number = DEFAULT_MULTIPLICATION_FACTOR

  private _id: number | null = null
  private _data: Array<Segment>

  private _paintCallbacks: Array<(args: AnimationPayload) => void> = []
  private _resetCallbacks: Array<(args: { timestamp: number }) => void> = []

  constructor(
    data: Array<Segment>,
    options: Partial<{
      multiplicationFactor: number,
    }> = {}
  ) {
    super()
    this._data = data

    this._multiplicationFactor = options.multiplicationFactor || DEFAULT_MULTIPLICATION_FACTOR
  }

  private _draw = (timestamp: number) => {
    timestamp *= this._multiplicationFactor
    this.emit(PlayState.Playing, { timestamp })

    timestamp = (this._pauses !== null) ?
      timestamp - this._pauses :
      timestamp

    if (this._index > this._data.length) {
      this._id && window.cancelAnimationFrame(this._id)
      this._id = null

      this._emit(PlayState.Finished, { timestamp })

      this.reset()
      return
    }

    if (this._prevSegmentTimestamp === null) {
      this._prevSegmentTimestamp = timestamp
    }

    const segmentTimeDelta = timestamp - this._prevSegmentTimestamp

    const prevDuration = this._calculateDuration(this._data[this._index]['duration'])
    if (segmentTimeDelta > prevDuration) {
      this._prevSegmentTimestamp = timestamp

      this._index += 1
    }

    const duration = this._data[this._index] ? this._calculateDuration(this._data[this._index]['duration']) : null
    const distance = this._data[this._index] ? this._data[this._index]['distance'] : null

    if (distance === null || duration === null ) {
      this._id && window.cancelAnimationFrame(this._id)
      this._id = null
      this._emit(PlayState.Finished, { timestamp })
      this.reset()
      return
    }

    const paintDelta = this._prevTimestamp === null ?
      FALLBACK_REFRESH_RATE_IN_MILISECONDS :
      (timestamp - this._prevTimestamp)
    this._prevTimestamp = timestamp

    this._performPaintCallbacks({
      distance,
      duration,
      paintDelta,
    })

    this._id = window.requestAnimationFrame(this._draw)
  }

  public reset = () => {
    this._performResetCallbacks({
      timestamp: performance.now() * this._multiplicationFactor,
    })

    this.pause()

    this._index = 0
    this._prevTimestamp = null
    this._prevSegmentTimestamp = null
    this._startTime = null
    this._pauseTime = null
    this._pauses = null
    this._isPlaying = false
  }

  public play = () => {
    this._isPlaying = true
    this._startTime = performance.now() * this._multiplicationFactor

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
    this._pauseTime = performance.now() * this._multiplicationFactor
    this._id && window.cancelAnimationFrame(this._id)
    this._id = null

    this.emit(PlayState.Paused, { timestamp: this._pauseTime })
  }

  public stop = () => {
    const stopTime = performance.now() * this._multiplicationFactor

    this._id && window.cancelAnimationFrame(this._id)
    this._id = null

    this.emit(PlayState.Stopped, { timestamp: stopTime })

    this.reset()
  }

  public registerPaintCallback(callback: (data: AnimationPayload) => void) {
    this._paintCallbacks.push(callback)
  }

  public registerResetCallback(callback: (data: { timestamp: number }) => void) {
    this._resetCallbacks.push(callback)
  }

  public unregisterAllCallbacks() {
    this._paintCallbacks = []
    this._resetCallbacks = []
  }

  private _calculateDuration = (duration: number): number => {
    return (duration * 1000) / this._multiplicationFactor
  }

  private _emit(name: PlayState, data: { timestamp: number }) {
    this.emit(name, data)
  }

  private _performPaintCallbacks(data: AnimationPayload) {
    this._paintCallbacks.forEach((callback) => callback(data))
  }

  private _performResetCallbacks(data: { timestamp: number }) {
    this._resetCallbacks.forEach((callback) => callback(data))
  }
}
