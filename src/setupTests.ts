import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// @ts-ignore: In real app I'd use JSDOM for testing
window.URL.createObjectURL = function(obj: any) {
  return ''
}

configure({ adapter: new Adapter() })
