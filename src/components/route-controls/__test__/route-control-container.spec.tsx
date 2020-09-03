import * as React from 'react'
import { LngLat } from 'mapbox-gl'
import chai, { expect } from 'chai'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import sinon, { spy } from 'sinon'

import RouteControlContainer from '../route-control-container'
import { Props } from '../route-input-container'
import TestUtils from '../../../utils/test-utils'
import { Services } from '../../../interfaces/services'

chai.use(chaiEnzyme())

describe('RouteControlContainer', () => {
  let context
  let useDispatch
  let useSelector

  beforeEach(() => {
    context = TestUtils.mockContext()
    useDispatch = TestUtils.mockDispatch(spy())
    useSelector = TestUtils.mockSelector(TestUtils.createRootState())
  })

  afterEach(() => {
    TestUtils.resetMock(context)
    TestUtils.resetMock(useDispatch)
    TestUtils.resetMock(useSelector)
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
    TestUtils.resetMock(useSelector)
    useSelector = TestUtils.mockSelector({ origin })

    const wrapper = renderComponent()

    expect(wrapper.find('RouteInputContainer').prop('origin'))
      .to.equal(origin)
  })

  it('should pass destination to RouteInputContainer', () => {
    const destination = new LngLat(1.2, 1.3)
    TestUtils.resetMock(useSelector)
    useSelector = TestUtils.mockSelector({ destination })

    const wrapper = renderComponent()

    expect(wrapper.find('RouteInputContainer').prop('destination'))
      .to.equal(destination)
  })

  it('should pass disabled false value to RouteInputContainer', () => {
    TestUtils.resetMock(useSelector)
    useSelector = TestUtils.mockSelector({ pending: false })

    const wrapper = renderComponent()

    expect(wrapper.find('RouteInputContainer').prop('disabled')).to.be.false
  })

  it('should pass disabled true value to routeinputcontainer', () => {
    TestUtils.resetMock(useSelector)
    useSelector = TestUtils.mockSelector({ pending: true })

    const wrapper = renderComponent()

    expect(wrapper.find('RouteInputContainer').prop('disabled')).to.be.true
  })

  describe('add markers', () => {
    it('should add origin marker based on origin input value', () => {
      TestUtils.resetMock(context)
      const addOriginMarker = spy()
      context = TestUtils.mockContext({
        mapActions: { addOriginMarker },
      })
      const wrapper = renderComponent()

      const onOriginSubmit = wrapper.find('RouteInputContainer').prop('onOriginSubmit') as Props['onOriginSubmit']
      onOriginSubmit('1.21, 2.23')

      expect(addOriginMarker.calledOnce).to.be.true
      const latLngArg = addOriginMarker.args[0][0]
      expect(latLngArg.lat).to.equal(2.23)
      expect(latLngArg.lng).to.equal(1.21)
    })

    it('should add origin marker when onOriginInputBlur ' +
       'callback is called', () => {
      TestUtils.resetMock(context)
      const addOriginMarker = spy()
      context = TestUtils.mockContext({
        mapActions: { addOriginMarker },
      })
      const wrapper = renderComponent()


      const onOriginInputBlur = wrapper.find('RouteInputContainer').prop('onOriginInputBlur') as Props['onOriginInputBlur']
      onOriginInputBlur('1.21, 2.23', true)

      expect(addOriginMarker.calledOnce).to.be.true

      const latLngArg = addOriginMarker.args[0][0]
      expect(latLngArg.lat).to.equal(2.23)
      expect(latLngArg.lng).to.equal(1.21)
    })

    it('should NOT add origin marker when onOriginInputBlur ' +
       'callback is called and value is not valid', () => {
      TestUtils.resetMock(context)
      const addOriginMarker = spy()
      context = TestUtils.mockContext({
        mapActions: { addOriginMarker },
      })
      const wrapper = renderComponent()

      const onOriginInputBlur = wrapper.find('RouteInputContainer').prop('onOriginInputBlur') as Props['onOriginInputBlur']
      onOriginInputBlur('1.21, a', false)

      expect(addOriginMarker.called).to.be.false
    })

    it('should add destination marker based on destination input value', () => {
      TestUtils.resetMock(context)
      const addDestinationMarker = spy()
      context = TestUtils.mockContext({
        mapActions: {
          ...context.mapActions,
          addDestinationMarker
        },
      })
      const wrapper = renderComponent()

      const onDestinationSubmit =
        wrapper.find('RouteInputContainer').prop('onDestinationSubmit') as Props['onDestinationSubmit']
      onDestinationSubmit('3.12, 4.21')

      expect(addDestinationMarker.calledOnce).to.be.true

      const latLngArg = addDestinationMarker.args[0][0]
      expect(latLngArg.lat).to.equal(4.21)
      expect(latLngArg.lng).to.equal(3.12)

    })

    it('should add destination marker when onOriginInputBlur ' +
       'callback is called', () => {
      TestUtils.resetMock(context)
      const addDestinationMarker = spy()
      context = TestUtils.mockContext({
        mapActions: { addDestinationMarker },
      })
      const wrapper = renderComponent()

      const onDestinationInputBlur =
        wrapper.find('RouteInputContainer').prop('onDestinationInputBlur') as Props['onDestinationInputBlur']
      onDestinationInputBlur('3.12, 4.21', true)


      expect(addDestinationMarker.calledOnce).to.be.true
      const latLngArg = addDestinationMarker.args[0][0]
      expect(latLngArg.lat).to.equal(4.21)
      expect(latLngArg.lng).to.equal(3.12)
    })

    it('should NOT add destination marker when onDestinationInputBlur ' +
       'callback is called and value is not valid', () => {
      TestUtils.resetMock(context)
      const addDestinationMarker = spy()
      context = TestUtils.mockContext({
        mapActions: { addDestinationMarker },
      })
      const wrapper = renderComponent()

      const onDestinationInputBlur =
        wrapper.find('RouteInputContainer').prop('onDestinationInputBlur') as Props['onDestinationInputBlur']
      onDestinationInputBlur('3.12, a', false)

      expect(addDestinationMarker.called).to.be.false

    })
  })

  describe('removing markers', () => {
    it('should remove origin marker when onOriginClearButtonClick ' +
       'callback is called', () => {
      TestUtils.resetMock(context)
      const removeOriginMarker = spy()
      TestUtils.mockContext({
        mapActions: { removeOriginMarker },
      })
      const wrapper = renderComponent()

      const onOriginClearButtonClick =
        wrapper.find('RouteInputContainer').prop('onOriginClearButtonClick') as Props['onOriginClearButtonClick']
      onOriginClearButtonClick()

      expect(removeOriginMarker.calledOnce).to.be.true
    })

    it('should reset graph when onOriginClearButtonClick ' +
       'callback is called', () => {
      TestUtils.resetMock(context)
      const reset = spy()
      TestUtils.mockContext({
        graphActions: { reset },
      })
      const wrapper = renderComponent()

      const onOriginClearButtonClick =
        wrapper.find('RouteInputContainer').prop('onOriginClearButtonClick') as Props['onOriginClearButtonClick']
      onOriginClearButtonClick()

      expect(reset.calledOnce).to.be.true
    })

    it('should remove destination marker when onDestinationClearButtonClick ' +
       'callback is called', () => {
      TestUtils.resetMock(context)
      const removeDestinationMarker = spy()
      TestUtils.mockContext({
        mapActions: { removeDestinationMarker },
      })
      const wrapper = renderComponent()

      const onDestinationClearButtonClick = wrapper.find('RouteInputContainer').prop('onDestinationClearButtonClick') as Props['onOriginClearButtonClick']
      onDestinationClearButtonClick()

      expect(removeDestinationMarker.calledOnce).to.be.true
    })

    it('should reset graph when onDestinationClearButtonClick ' +
       'callback is called', () => {
      TestUtils.resetMock(context)
      const reset = spy()
      TestUtils.mockContext({
        graphActions: { reset },
      })
      const wrapper = renderComponent()

      const onDestinationClearButtonClick = wrapper.find('RouteInputContainer').prop('onDestinationClearButtonClick') as Props['onOriginClearButtonClick']
      onDestinationClearButtonClick()

      expect(reset.calledOnce).to.be.true
    })

    describe('focusing markers', () => {
      it('should focus to origin marker when onOriginFocusButtonClick ' +
         'callback is called', () => {
        TestUtils.resetMock(context)
        const moveToOrigin = spy()
        TestUtils.mockContext({
          mapActions: { moveToOrigin },
        })
        const wrapper = renderComponent()

        const onOriginFocusButtonClick =
          wrapper.find('RouteInputContainer').prop('onOriginFocusButtonClick') as Props['onOriginFocusButtonClick']
        onOriginFocusButtonClick()

        expect(moveToOrigin.calledOnce).to.be.true
      })

      it('should focus to destination marker when onDestinationFocusButtonClick ' +
         'callback is called', () => {
        TestUtils.resetMock(context)
        const moveToDestination = spy()
        TestUtils.mockContext({
          mapActions: { moveToDestination },
        })
        const wrapper = renderComponent()


        const onDestinationFocusButtonClick =
          wrapper.find('RouteInputContainer').prop('onDestinationFocusButtonClick') as Props['onDestinationFocusButtonClick']
        onDestinationFocusButtonClick()

        expect(moveToDestination.calledOnce).to.be.true
      })
    })
  })

  describe('submitting', () => {
    it('should find route when onSubmit callback is called', () => {
      TestUtils.resetMock(context)
      const findRoute = spy()
      TestUtils.mockContext({
        mapActions: { ...context().mapActions, findRoute },
      })
      const wrapper = renderComponent()

      const onSubmit: Props['onSubmit'] =
        // @ts-ignore: Incompatible enzyme children prop matching
        wrapper.find('RouteInputContainer').prop('onSubmit') as Props['onSubmit']
      onSubmit('1.21, 2.21', '1.22, 2.23')

      expect(findRoute.calledOnce).to.be.true
    })

    it('should add origin marker if submitted value is updated', () => {
      TestUtils.resetMock(context)
      const addOriginMarker = spy()
      TestUtils.mockContext({
        mapActions: { ...context().mapActions, addOriginMarker },
      })
      const wrapper = renderComponent()

      const onSubmit =
        // @ts-ignore: Incompatible enzyme children prop matching
        wrapper.find('RouteInputContainer').prop('onSubmit') as Props['onSubmit']
      onSubmit('1.21, 2.21', '1.22, 2.23')

      expect(addOriginMarker.calledOnce).to.be.true
      const originLngLatArg = addOriginMarker.args[0][0]
      expect(originLngLatArg.lng).to.equal(1.21)
      expect(originLngLatArg.lat).to.equal(2.21)
    })

    it('should NOT add origin marker if submitted value is NOT updated', () => {
      TestUtils.resetMock(context)
      TestUtils.resetMock(useSelector)
      TestUtils.mockSelector({
        origin: new LngLat(1.21, 2.21),
      })
      const addOriginMarker = spy()
      TestUtils.mockContext({
        mapActions: { ...context().mapActions, addOriginMarker },
      })
      const wrapper = renderComponent()

      const onSubmit =
        // @ts-ignore: Incompatible enzyme children prop matching
        wrapper.find('RouteInputContainer').prop('onSubmit') as Props['onSubmit']
      onSubmit('1.21, 2.21', '1.22, 2.23')

      expect(addOriginMarker.called).to.be.false
    })

    it('should add destination marker if submitted value is updated', () => {
      TestUtils.resetMock(context)
      const addDestinationMarker = spy()
      TestUtils.mockContext({
        mapActions: { ...context().mapActions, addDestinationMarker },
      })

      const wrapper = renderComponent()

      const onSubmit =
        // @ts-ignore: Incompatible enzyme children prop matching
        wrapper.find('RouteInputContainer').prop('onSubmit') as Props['onSubmit']
      onSubmit('1.21, 2.21', '3.31, 4.40')

      expect(addDestinationMarker.calledOnce).to.be.true
      const lngLatArg = addDestinationMarker.args[0][0]
      expect(lngLatArg)
    })

    it('should NOT add destination marker if submitted value is NOT updated', () => {
      TestUtils.resetMock(context)
      TestUtils.resetMock(useSelector)
      const addDestinationMarker = spy()
      TestUtils.mockContext({
        mapActions: { ...context().mapActions, addDestinationMarker },
      })
      TestUtils.mockSelector({
        destination: new LngLat(3.12, 4.13),
      })

      const wrapper = renderComponent()

      const onSubmit =
        // @ts-ignore: Incompatible enzyme children prop matching
        wrapper.find('RouteInputContainer').prop('onSubmit') as Props['onSubmit']
      onSubmit('1.21, 2.21', '3.12, 4.13')

      expect(addDestinationMarker.called).to.be.false
    })
  })

  describe('reset button', () => {
    it('should remove all markers when onReset callback is called', () => {
      TestUtils.resetMock(context)
      const removeMarkers = spy()
      TestUtils.mockContext({
        mapActions: { ...context().mapActions, removeMarkers },
      })
      const wrapper = renderComponent()

      const onReset = wrapper.find('RouteInputContainer').props().onReset as Props['onReset'] 
      onReset()

      expect(removeMarkers.calledOnce).to.be.true
    })

    it('should reset graph when onReset callback is called', () => {
      TestUtils.resetMock(context)
      const reset = spy()
      TestUtils.mockContext({
        graphActions: { ...context().graphActions, reset },
      })
      const wrapper = renderComponent()

      const onReset = wrapper.find('RouteInputContainer').props().onReset as Props['onReset'] 
      onReset()

      expect(reset.calledOnce).to.be.true
    })
  })

  describe('error', () => {
    it('should should NOT render ErrorPanel', () => {
      const wrapper = renderComponent()

      expect(wrapper.find('ErrorPanel')).not.to.exist
    })

    it('should render ErrorPanel', () => {
      TestUtils.resetMock(useSelector)
      const error = new Error('Test error')
      TestUtils.mockSelector({
        requestError: error,
      })

      const wrapper = renderComponent()

      expect(wrapper.find('ErrorPanel')).to.exist
    })

    it('should pass error to ErrorPanel', () => {
      TestUtils.resetMock(useSelector)
      const error = new Error('Test error')
      TestUtils.mockSelector({
        requestError: error,
      })

      const wrapper = renderComponent()

      expect(wrapper.find('ErrorPanel').prop('error'))
        .to.equal(error)
    })
  })
})
