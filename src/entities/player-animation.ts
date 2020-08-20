import { PAINT_RATE } from '../services/managers/graph-manager'

export default class PlayerAnimation {
  private _ctx: CanvasRenderingContext2D
  private _initialTimestamp: number | null = null
  private _compoundDuration: number = 0
  private _durationsInMs: Array<number> = []
  private _distancesInPx: Array<number> = []
  private _totalDurationInMs: number

  private _interval: number | null = null
  private _timer: number | null = null
  private _animationRequestId: number | null = null

  private _x: number = 0
  private _index: number = 0
  private _isPlaying: boolean = false

  constructor(
    ctx: CanvasRenderingContext2D,
    durations: Array<number>,
    distancesInPx: Array<number>,
    options: {
      totalDurationInMs: number,
    },
  ) {
    this._ctx = ctx
    this._durationsInMs = durations
    this._distancesInPx = distancesInPx
    this._totalDurationInMs = options.totalDurationInMs
  }

  private _draw = (timestamp: number) => {
    const index = this._setTime(timestamp)
    const duration = this._durationsInMs[index]
    const distance = this._distancesInPx[index]
    const step = distance / (duration / PAINT_RATE)

    this._x += step

    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)

    this._ctx.strokeStyle = "limegreen"
    this._ctx.lineWidth = 1
    this._ctx.beginPath()
    this._ctx.moveTo(this._x, 0)
    this._ctx.lineTo(this._x, 500)
    this._ctx.stroke()
  }

  private _setTime(timestamp: number): number {
    if (this._initialTimestamp === null) {
      this._initialTimestamp = timestamp
    }
    const time = timestamp - this._initialTimestamp

    if (time > this._durationsInMs[this._index] + this._compoundDuration) {
      this._index += 1
      this._compoundDuration += this._durationsInMs[this._index - 1]
    }

    return this._index
  }

  public play() {
    this._isPlaying = true
    console.info('Graph Animation | play')

    this._interval = window.setInterval(() => {
      this._animationRequestId = window.requestAnimationFrame(this._draw)
    }, PAINT_RATE)

    this._timer = window.setTimeout(() => {
      this._interval && window.clearInterval(this._interval)
    }, this._totalDurationInMs)
  }

  public stop() {
    this._isPlaying = false
    console.info('Graph Animation | stop')

    this._resetAllTimers()
    this._resetAnimation()

    const canvas = this._ctx.canvas
    this._ctx.clearRect(0, 0, canvas.width, canvas.height)

    this._resetValues()
  }

  public pause() {
    this._isPlaying = false
    this._resetAllTimers()
    this._resetAnimation()

    console.info('Graph Animation | paused')

  }

  private _resetValues() {
    this._initialTimestamp = null
    this._compoundDuration = 0
    this._x = 0
    this._index = 0
  }

  private _resetAllTimers() {
    this._resetInterval()
    this._resetTimeout()
  }

  private _resetInterval() {
    if (this._interval !== null) {
      window.clearInterval(this._interval)
    }
    this._interval = null
  }

  private _resetTimeout() {
    if (this._timer !== null) {
      window.clearTimeout(this._timer)
    }

    this._timer = null
  }

  private _resetAnimation() {
    if (this._animationRequestId) {
      window.cancelAnimationFrame(this._animationRequestId)
    }
    this._animationRequestId = null
  }
}

