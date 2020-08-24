import { AnimationPayload } from '../../interfaces/animation'

export default class GraphAnimation {
  private _x: number = 0
  private _width: number
  private _height: number
  private _ctx: CanvasRenderingContext2D
  private _totalDistance: number

  constructor(ctx: CanvasRenderingContext2D, totalDistance: number) {
    this._ctx = ctx
    this._width = ctx.canvas.width
    this._height = ctx.canvas.height
    this._totalDistance = totalDistance
  }

  public update = (data: AnimationPayload): void => {
    const { distance, duration, paintDelta } = data
    console.log(distance, duration)

    const ratio = (distance / this._totalDistance)
    const distanceInPx = ratio * this._width
    const step = distanceInPx / (duration / paintDelta)

    this._x += step

    this._ctx.clearRect(0, 0, this._width, this._height)

    this._ctx.strokeStyle = "limegreen"
    this._ctx.lineWidth = 1
    this._ctx.beginPath()
    this._ctx.moveTo(this._x, 0)
    this._ctx.lineTo(this._x, this._height)

    this._ctx.stroke()
  }

  public reset = (_data: { timestamp: number }) => {
    this._x = 0
    this._ctx.clearRect(0, 0, this._width, this._height)
  }
}

