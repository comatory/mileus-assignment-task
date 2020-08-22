// @ts-nocheck

let index = 0
let x = 0
let width = null
let height = null
let prevTimestamp
let prevSegmentTimestamp = null
let startTime = null
let pauseTime = null
let pauses = null
let isPlaying = false
let totalDistance = null

let id
let ctx
let data

const reset = () => {
  index = 0
  x = 0
  prevTimestamp = undefined
  prevSegmentTimestamp = null
  startTime = null
  pauseTime = null
  pauses = null
  isPlaying = false
}

const draw = (timestamp) => {
  timestamp = (pauses !== null) ?
    timestamp - pauses :
    timestamp

  console.log(index)
  if (index > data.length) {
    cancelAnimationFrame(id)
    id = null
    reset()
    return
  }

  if (prevSegmentTimestamp === null) {
    prevSegmentTimestamp = timestamp
  }

  const segmentTimeDelta = timestamp - prevSegmentTimestamp

  const prevDuration = data[index]['duration'] * 1000
  if (segmentTimeDelta > prevDuration) {
    prevSegmentTimestamp = timestamp

    index += 1
  }

  const duration = data[index] ? data[index]['duration'] * 1000 : null
  const distance = data[index] ? data[index]['distance'] : null

  if (!Number.isFinite(distance) || !Number.isFinite(duration)) {
    cancelAnimationFrame(id)
    id = null
    reset()
    return
  }

  const paintDelta = (timestamp - prevTimestamp) || 16.6
  const ratio = (distance / totalDistance)
  const distanceInPx = ratio * width
  const step = distanceInPx / (duration / paintDelta)

  prevTimestamp = timestamp
  x += step

  ctx.clearRect(0, 0, width, height)

  ctx.strokeStyle = "limegreen"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(x, 0)
  ctx.lineTo(x, 500)
  ctx.stroke()

  id = requestAnimationFrame(draw)
}

const play = (inputContext, inputData, inputTotalDistance) => {
  if (isPlaying) {
    return
  }
  ctx = inputContext
  width = inputContext.canvas.width
  height = inputContext.canvas.height
  data = inputData
  totalDistance = inputTotalDistance

  isPlaying = true
  startTime = performance.now()

  pauses += pauseTime !== null ? (startTime - pauseTime) : null
  console.info(pauses)
  id = requestAnimationFrame(draw)
}

const pause = () => {
  isPlaying = false
  pauseTime = performance.now()
  cancelAnimationFrame(id)
  id = null
}

const stop = () => {
  ctx.clearRect(0, 0, width, height)

  cancelAnimationFrame(id)
  id = null

  reset()
}

export {
  play,
  pause,
  stop,
  reset,
}
