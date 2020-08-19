import { PAINT_RATE } from '../services/managers/graph-manager'

export default class PlayerAnimation {
  private _ctx: CanvasRenderingContext2D
  private _initialTimestamp: number | null = null
  private _compoundDuration: number = 0
  private _durationsInMs: Array<number> = []
  private _distancesInPx: Array<number> = []

  private _x: number = 0
  private _index: number = 0

  constructor(
    ctx: CanvasRenderingContext2D,
    durations: Array<number>,
    distancesInPx: Array<number>,
  ) {
    this._ctx = ctx
    this._durationsInMs = durations
    this._distancesInPx = distancesInPx
  }

  public play = (timestamp: number) => {
    if (this._initialTimestamp === null) {
      this._initialTimestamp = timestamp
    }
    const time = timestamp - this._initialTimestamp
    console.log(time)

    if (time > this._durationsInMs[this._index] + this._compoundDuration) {
      this._index += 1
      this._compoundDuration += this._durationsInMs[this._index - 1]
    }
    const duration = this._durationsInMs[this._index]

    const distance = this._distancesInPx[this._index]

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
}

