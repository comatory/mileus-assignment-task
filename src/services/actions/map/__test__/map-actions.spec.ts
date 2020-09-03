import { expect } from 'chai'
import mapbox, { Map, LngLat } from 'mapbox-gl'
import * as sinon from 'sinon'

import TestUtils from '../../../../utils/test-utils'
import { MAP_ACTION_TYPES } from '../action-creators'
import { ROUTE_ACTIONS_TYPES } from '../../route/action-creators'
import mockMapFactory, { getMap } from '../../../../mocks/factories/map-factory.mock'
import ioc from '../../../../ioc'

import {
  initialize,
  createMap,
  removeMap,
  addOriginMarker,
  removeOriginMarker,
} from '../map-actions'

describe('map actions', () => {
  describe('initialize', () => {
    it('should initialize token', () => {
      const mapboxStub = sinon.stub(mapbox)

      initialize('abcd')

      expect(mapboxStub.accessToken).to.equal('abcd')
    })
  })

  describe('create map', () => {
    it('should dispatch action to set map', () => {
      const node = document.createElement('div')
      node.setAttribute('id', 'map')
      document.body.appendChild(node)

      const dispatch = sinon.spy()
      const getState = sinon.stub().returns(TestUtils.createRootState())
      const mapFactory = mockMapFactory()
      const services = {
        ...ioc,
        mapFactory,
      }

      createMap(node)(dispatch, getState, services)

      const map = getMap()

      expect(dispatch.calledOnce).to.be.true
      expect(dispatch.args[0][0].type).to.equal(MAP_ACTION_TYPES.MAP_ACTION_SET_MAP)
      expect(dispatch.args[0][0].data.map).to.equal(map)
    })
  })

  describe('remove map', () => {
    it('should remove map', () => {
      const node = document.createElement('div')
      node.setAttribute('id', 'map')
      document.body.appendChild(node)

      const map = new Map({ container: node })
      const dispatch = sinon.spy()
      const rootState = TestUtils.createRootState()
      const getState = sinon.stub().returns({
        ...rootState,
        map: { ...rootState.map, map }
      })

      removeMap()(dispatch, getState)

      expect(dispatch.calledOnce).to.be.true
      expect(dispatch.args[0][0].type).to.equal(MAP_ACTION_TYPES.MAP_ACTION_CLEAR_MAP)
    })

    it('should NOT remove map if it doesn\'t exist', () => {
      const node = document.createElement('div')
      node.setAttribute('id', 'map')
      document.body.appendChild(node)

      const dispatch = sinon.spy()
      const rootState = TestUtils.createRootState()
      const getState = sinon.stub().returns({
        ...rootState,
        map: { ...rootState.map, map: null }
      })

      removeMap()(dispatch, getState)

      expect(dispatch.called).to.be.false
    })
  })

  describe('add origin marker', () => {
    it('should dispatch action to clear route request error', () => {
      const node = document.createElement('div')
      node.setAttribute('id', 'map')
      document.body.appendChild(node)
      const origin = new LngLat(1.11, 2.22)
      const dispatch = sinon.spy()
      const rootState = TestUtils.createRootState()
      const getState = sinon.stub().returns({
        ...rootState,
        map: { ...rootState.map, map: new Map({ container: node }) },
      })

      addOriginMarker(origin)(dispatch, getState, ioc)

      const clearRequestErrorAction = dispatch.getCalls()[0].firstArg
      expect(clearRequestErrorAction.type).to.equal(ROUTE_ACTIONS_TYPES.ROUTE_ACTION_REQUEST_ERROR_CLEAR)
      removeOriginMarker()(dispatch, getState, ioc)
    })

    it('should dispatch action to set origin', () => {
      const node = document.createElement('div')
      node.setAttribute('id', 'map')
      document.body.appendChild(node)
      const origin = new LngLat(1.11, 2.22)
      const dispatch = sinon.spy()
      const rootState = TestUtils.createRootState()
      const getState = sinon.stub().returns({
        ...rootState,
        map: { ...rootState.map, map: new Map({ container: node }) },
      })

      addOriginMarker(origin)(dispatch, getState, ioc)

      const setOriginAction = dispatch.getCalls()[1].firstArg
      expect(setOriginAction.type).to.equal(ROUTE_ACTIONS_TYPES.ROUTE_ACTION_SET_ORIGIN)
      expect(setOriginAction.data.origin).to.equal(origin)
    })
  })
})
