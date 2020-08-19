export interface Segment {
  distance: number,
  duration: number,
  speed: number,
  speedInKm: number,
  timestamp: number,
}

export interface Graph {
  distance: number,
  duration: number,
  segments: Array<Segment>,
}

