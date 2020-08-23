import { EventEmitter } from 'events'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-webgl-canvas-mock'

window.URL.createObjectURL = function(obj: any) {
  return ''
}

class MockWebWorker extends EventEmitter {
  url: string

  constructor(url: string) {
    super()
    this.url = url
  }

  postMessage(message: string) {
    this.emit('test:onMessage', message)
  }

  addEventListener(eventName: string, callback: any) {
    super.addListener(eventName, callback)
  }

  removeEventListener(eventName: string, callback: any) {
    super.removeListener(eventName, callback)
  }
}

// @ts-ignore: Real application would have all methods on worker
window.Worker = MockWebWorker

configure({ adapter: new Adapter() })
