import { EventEmitter } from 'events'

import { IGraphManager } from '../../interfaces/managers'

export default class MockGraphManager extends EventEmitter implements IGraphManager {
  registerPlayerGraphCanvas(ref: React.RefObject<HTMLCanvasElement> | null) {
    this.emit('test:registerPlayerGraphCanvas', ref)
  }

  unregisterPlayerGraphCanvas() {
    this.emit('test:unregisterPlayerGraphCanvas')
  }

  play() {
    this.emit('test:play')
  }

  stop() {
    this.emit('test:stop')
  }

  pause() {
    this.emit('test:pause')
  }

  reset() {
    this.emit('test:reset')
  }
}
