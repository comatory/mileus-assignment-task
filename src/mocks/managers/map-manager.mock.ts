import { LngLat } from 'mapbox-gl'
import { EventEmitter } from 'events'

import { IMapManager } from '../../interfaces/managers'

export default class MockMapManager extends EventEmitter implements IMapManager {
  initialize(token: string) {
    this.emit('test:initialize', token)
  }

  createMap(node: HTMLElement) {
    this.emit('test:createMap', node)
  }

  removeMap() {
    this.emit('test:removeMap')
  }

  addOriginMarker(lngLat: LngLat, moveMap?: boolean) {
    this.emit('test:addOriginMarker', { lngLat, moveMap: moveMap || false })
  }

  addDestinationMarker(lngLat: LngLat, moveMap?: boolean) {
    this.emit('test:addDestinationMarker', { lngLat, moveMap: moveMap || false })
  }

  findRoute(origin: LngLat, destination: LngLat) {
    this.emit('test:findRoute', { origin, destination })
    return Promise.resolve()
  }

  moveToOrigin() {
    this.emit('test:moveToOrigin')
  }

  moveToDestination() {
    this.emit('test:moveToDestination')
  }

  removeOriginMarker() {
    this.emit('test:removeOriginMarker')
  }

  removeDestinationMarker() {
    this.emit('test:removeDestinationMarker')
  }

  removeMarkers() {
    this.emit('test:removeMarkers')
  }
}
