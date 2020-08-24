import { Map } from 'mapbox-gl'
import EventEmitter from 'events'

export default class MockMapStore {
  private _map: Map | null = null
  private _emitter: EventEmitter = new EventEmitter()

  getMap(): Map | null {
    return this._map
  }

  addListener = (callback: () => void) => {
    this._emitter.addListener('change', callback)

    return {
      remove: () => this.remove(callback)
    }
  }

  remove = (callback: () => void) => {
    this._emitter.removeListener('change', callback)
  }

  private _emitChange() {
    this._emitter.emit('change')
  }

  public setMapInTest(map: Map) {
    this._map = map
    this._emitChange()
  }
}

