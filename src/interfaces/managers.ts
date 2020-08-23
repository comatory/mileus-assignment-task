import * as React from 'react'
import { LngLat } from 'mapbox-gl'

export interface IMapManager {
  initialize: (token: string) => void,
  createMap: (node: HTMLElement) => void,
  removeMap: () => void,
  addOriginMarker: (lngLat: LngLat, moveMap: boolean) => void,
  addDestinationMarker: (lngLat: LngLat, moveMap: boolean) => void,
  findRoute: (origin: LngLat, destination: LngLat) => Promise<void>,
  moveToOrigin: () => void,
  moveToDestination: () => void,
  removeOriginMarker: () => void,
  removeDestinationMarker: () => void,
  removeMarkers: () => void,
}

export interface IGraphManager {
  registerPlayerGraphCanvas: (ref: React.RefObject<HTMLCanvasElement> | null) => void,
  unregisterPlayerGraphCanvas: () => void,
  play: () => void,
  stop: () => void,
  pause: () => void,
  reset: () => void,
}
