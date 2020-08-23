import * as React from 'react'
import { LngLat } from 'mapbox-gl'
import chai, { expect } from 'chai'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'

import RouteControlContainer from '../route-control-container'
import { Props } from '../route-input-container'
import MockRouteStore from '../../../mocks/stores/route-store.mock'
import MockMapManager from '../../../mocks/managers/map-manager.mock'
import MockGraphManager from '../../../mocks/managers/graph-manager.mock'

chai.use(chaiEnzyme())

let mockRouteStore: MockRouteStore
let mockMapManager: MockMapManager
let mockGraphManager: MockGraphManager

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => {
    return {
      graphManager: mockGraphManager,
      mapManager: mockMapManager,
      routeStore: mockRouteStore,
    }
  }
}))

describe('RouteControlContainer', () => {

  beforeEach(() => {
    mockGraphManager = new MockGraphManager()
    mockMapManager = new MockMapManager()
    mockRouteStore = new MockRouteStore()
  })

  const renderComponent = () => {
    return shallow(<RouteControlContainer />)
  }

  it('should render container', () => {
    const wrapper = renderComponent()

    expect(wrapper.find('.route-control-container')).to.exist
  })

  it('should render RouteInputContainer', () => {
    const wrapper = renderComponent()

    expect(wrapper.find('RouteInputContainer')).to.exist
  })

  it('should pass origin to RouteInputContainer', () => {
    const origin = new LngLat(1.2, 1.3)
    mockRouteStore.setOriginInTest(origin)

    const wrapper = renderComponent()

    expect(wrapper.find('RouteInputContainer').prop('origin'))
      .to.equal(origin)
  })

  it('should pass destination to RouteInputContainer', () => {
    const destination = new LngLat(1.2, 1.3)
    mockRouteStore.setDestinationInTest(destination)

    const wrapper = renderComponent()

    expect(wrapper.find('RouteInputContainer').prop('destination'))
      .to.equal(destination)
  })

  it('should pass disabled false value to RouteInputContainer', () => {
    mockRouteStore.setRouteRequestPendingInTest(false)

    const wrapper = renderComponent()

    expect(wrapper.find('RouteInputContainer').prop('disabled')).to.be.false
  })

  it('should pass disabled true value to routeinputcontainer', () => {
    mockRouteStore.setRouteRequestPendingInTest(true)

    const wrapper = renderComponent()

    expect(wrapper.find('RouteInputContainer').prop('disabled')).to.be.true
  })

  describe('add markers', () => {
    it('should add origin marker based on origin input value', (callback) => {
      const wrapper = renderComponent()

      mockMapManager.on('test:addOriginMarker', ({ lngLat }) => {
        expect(lngLat.lng).to.equal(1.21)
        expect(lngLat.lat).to.equal(2.23)
        callback()
      })

      const onOriginSubmit = wrapper.find('RouteInputContainer').prop('onOriginSubmit') as Props['onOriginSubmit']
      onOriginSubmit('1.21, 2.23')
    })

    it('should add origin marker when onOriginInputBlur ' +
       'callback is called', (callback) => {
      const wrapper = renderComponent()


      mockMapManager.on('test:addOriginMarker', ({ lngLat }) => {
        expect(lngLat.lng).to.equal(1.21)
        expect(lngLat.lat).to.equal(2.23)
        callback()
      })

      const onOriginInputBlur = wrapper.find('RouteInputContainer').prop('onOriginInputBlur') as Props['onOriginInputBlur']
      onOriginInputBlur('1.21, 2.23', true)
    })

    it('should NOT add origin marker when onOriginInputBlur ' +
       'callback is called and value is not valid', (callback) => {
      const wrapper = renderComponent()

      mockMapManager.on('test:addOriginMarker', () => {
        callback.fail('Should not be called')
      })

      const onOriginInputBlur = wrapper.find('RouteInputContainer').prop('onOriginInputBlur') as Props['onOriginInputBlur']
      onOriginInputBlur('1.21, a', false)

      setTimeout(callback, 20)
    })

    it('should add destination marker based on destination input value', (callback) => {
      const wrapper = renderComponent()

      mockMapManager.on('test:addDestinationMarker', ({ lngLat }) => {
        expect(lngLat.lng).to.equal(3.12)
        expect(lngLat.lat).to.equal(4.21)
        callback()
      })

      const onDestinationSubmit =
        wrapper.find('RouteInputContainer').prop('onDestinationSubmit') as Props['onDestinationSubmit']
      onDestinationSubmit('3.12, 4.21')
    })

    it('should add destination marker when onOriginInputBlur ' +
       'callback is called', (callback) => {
      const wrapper = renderComponent()

      mockMapManager.on('test:addDestinationMarker', ({ lngLat }) => {
        expect(lngLat.lng).to.equal(3.12)
        expect(lngLat.lat).to.equal(4.21)
        callback()
      })

      const onDestinationInputBlur =
        wrapper.find('RouteInputContainer').prop('onDestinationInputBlur') as Props['onDestinationInputBlur']
      onDestinationInputBlur('3.12, 4.21', true)
    })

    it('should NOT add destination marker when onDestinationInputBlur ' +
       'callback is called and value is not valid', (callback) => {
      const wrapper = renderComponent()

      mockMapManager.on('test:addDestinationMarker', () => {
        callback.fail('Should not be called')
      })

      const onDestinationInputBlur =
        wrapper.find('RouteInputContainer').prop('onDestinationInputBlur') as Props['onDestinationInputBlur']
      onDestinationInputBlur('3.12, a', false)
      setTimeout(callback, 20)
    })
  })

  describe('removing markers', () => {
    it('should remove origin marker when onOriginClearButtonClick ' +
       'callback is called', (callback) => {
      const wrapper = renderComponent()

      mockMapManager.on('test:removeOriginMarker', () => {
        callback()
      })

      const onOriginClearButtonClick =
        wrapper.find('RouteInputContainer').prop('onOriginClearButtonClick') as Props['onOriginClearButtonClick']
      onOriginClearButtonClick()
    })

    it('should remove destination marker when onDestinationClearButtonClick ' +
       'callback is called', (callback) => {
      const wrapper = renderComponent()

      mockMapManager.on('test:removeDestinationMarker', () => {
        callback()
      })

      const onDestinationClearButtonClick = wrapper.find('RouteInputContainer').prop('onDestinationClearButtonClick') as Props['onOriginClearButtonClick']
      onDestinationClearButtonClick()
    })

    describe('focusing markers', () => {
      it('should focus to origin marker when onOriginFocusButtonClick ' +
         'callback is called', (callback) => {
        const wrapper = renderComponent()

        mockMapManager.on('test:moveToOrigin', () => {
          callback()
        })

        const onOriginFocusButtonClick =
          wrapper.find('RouteInputContainer').prop('onOriginFocusButtonClick') as Props['onOriginFocusButtonClick']
        onOriginFocusButtonClick()
      })

      it('should focus to destination marker when onDestinationFocusButtonClick ' +
         'callback is called', (callback) => {
        const wrapper = renderComponent()

        mockMapManager.on('test:moveToDestination', () => {
          callback()
        })

        const onDestinationFocusButtonClick =
          wrapper.find('RouteInputContainer').prop('onDestinationFocusButtonClick') as Props['onDestinationFocusButtonClick']
        onDestinationFocusButtonClick()
      })
    })
  })

  describe('submitting', () => {
    it('should find route when onSubmit callback is called', (callback) => {
      const wrapper = renderComponent()

      mockMapManager.on('test:findRoute', ({ origin, destination }) => {
        expect(origin.lng).to.equal(1.21)
        expect(origin.lat).to.equal(2.21)
        expect(destination.lng).to.equal(1.22)
        expect(destination.lat).to.equal(2.23)
        callback()
      })

      const onSubmit: Props['onSubmit'] =
        // @ts-ignore: Incompatible enzyme children prop matching
        wrapper.find('RouteInputContainer').prop('onSubmit') as Props['onSubmit']
      onSubmit('1.21, 2.21', '1.22, 2.23')
    })

    it('should add origin marker if submitted value is updated', (callback) => {
      mockRouteStore.setOriginInTest(new LngLat(1.20, 2.01))

      const wrapper = renderComponent()

      mockMapManager.on('test:addOriginMarker', ({ lngLat }) => {
        expect(lngLat.lng).to.equal(1.21)
        expect(lngLat.lat).to.equal(2.21)
        callback()
      })

      const onSubmit =
        // @ts-ignore: Incompatible enzyme children prop matching
        wrapper.find('RouteInputContainer').prop('onSubmit') as Props['onSubmit']
      onSubmit('1.21, 2.21', '1.22, 2.23')
    })

    it('should NOT add origin marker if submitted value is NOT updated', (callback) => {
      mockRouteStore.setOriginInTest(new LngLat(1.21, 2.21))

      const wrapper = renderComponent()

      mockMapManager.on('test:addOriginMarker', () => {
        callback.fail('Should not be called')
      })

      const onSubmit =
        // @ts-ignore: Incompatible enzyme children prop matching
        wrapper.find('RouteInputContainer').prop('onSubmit') as Props['onSubmit']
      onSubmit('1.21, 2.21', '1.22, 2.23')

      setTimeout(callback, 20)
    })

    it('should add destination marker if submitted value is updated', (callback) => {
      mockRouteStore.setDestinationInTest(new LngLat(3.12, 4.13))

      const wrapper = renderComponent()

      mockMapManager.on('test:addDestinationMarker', ({ lngLat }) => {
        expect(lngLat.lng).to.equal(3.31)
        expect(lngLat.lat).to.equal(4.40)
        callback()
      })

      const onSubmit =
        // @ts-ignore: Incompatible enzyme children prop matching
        wrapper.find('RouteInputContainer').prop('onSubmit') as Props['onSubmit']
      onSubmit('1.21, 2.21', '3.31, 4.40')
    })

    it('should NOT add destination marker if submitted value is NOT updated', (callback) => {
      mockRouteStore.setDestinationInTest(new LngLat(3.12, 4.13))

      const wrapper = renderComponent()

      mockMapManager.on('test:addDestinationMarker', () => {
        callback.fail('Should not be called')
      })

      const onSubmit =
        // @ts-ignore: Incompatible enzyme children prop matching
        wrapper.find('RouteInputContainer').prop('onSubmit') as Props['onSubmit']
      onSubmit('1.21, 2.21', '3.12, 4.13')

      setTimeout(callback, 20)
    })
  })

  describe('reset button', () => {
    it('should remove all markers when onReset callback is called', (callback) => {
      const wrapper = renderComponent()

      mockMapManager.on('test:removeMarkers', () => {
        callback()
      })

      const onReset = wrapper.find('RouteInputContainer').props().onReset as Props['onReset'] 
      onReset()
    })

    it('should reset graph when onReset callback is called', (callback) => {
      const wrapper = renderComponent()

      mockGraphManager.on('test:reset', () => {
        callback()
      })

      const onReset = wrapper.find('RouteInputContainer').props().onReset as Props['onReset'] 
      onReset()
    })
  })

  describe('error', () => {
    it('should should NOT render ErrorPanel', () => {
      const wrapper = renderComponent()

      expect(wrapper.find('ErrorPanel')).not.to.exist
    })

    it('should render ErrorPanel', () => {
      const error = new Error('Test error')
      mockRouteStore.setRouteRequestErrorInTest(error)

      const wrapper = renderComponent()

      expect(wrapper.find('ErrorPanel')).to.exist
    })

    it('should pass error to ErrorPanel', () => {
      const error = new Error('Test error')
      mockRouteStore.setRouteRequestErrorInTest(error)

      const wrapper = renderComponent()

      expect(wrapper.find('ErrorPanel').prop('error'))
        .to.equal(error)
    })
  })
})
