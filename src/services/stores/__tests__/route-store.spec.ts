import { expect } from 'chai'
import { Dispatcher } from 'flux'
import { LngLat } from 'mapbox-gl'

import RouteStore, { RouteAction } from '../../stores/route-store'
import RouteActions from '../../actions/route-actions'
import TestUtils from '../../../utils/test-utils'

describe('RouteStore', () => {
  let routeActions: RouteActions
  let services: {
    dispatcher: Dispatcher<RouteAction>,
  }

  beforeEach(() => {
    services = {
      dispatcher: new Dispatcher()
    }

    routeActions = new RouteActions(services)
  })

  it('should create instance of Route Store', () => {
    const store = new RouteStore(services)

    expect(store).to.be.instanceOf(RouteStore)
  })

  describe('origin', () => {
    it('should set origin', () => {
      const origin = new LngLat(1.2, 2.3)
      const store = new RouteStore(services)

      routeActions.setOrigin(origin)

      expect(store.getOrigin()).to.equal(origin)
    })

    it('should clear origin', () => {
      const origin = new LngLat(1.2, 2.3)
      const store = new RouteStore(services)

      routeActions.setOrigin(origin)
      routeActions.clearOrigin()

      expect(store.getOrigin()).to.be.null
    })

    it('should return null for empty origin', () => {
      const store = new RouteStore(services)

      expect(store.getOrigin()).to.be.null
    })
  })

  describe('destination', () => {
    it('should set destination', () => {
      const destination = new LngLat(1.2, 2.3)
      const store = new RouteStore(services)

      routeActions.setDestination(destination)

      expect(store.getDestination()).to.equal(destination)
    })

    it('should clear destination', () => {
      const destination = new LngLat(1.2, 2.3)
      const store = new RouteStore(services)

      routeActions.setDestination(destination)
      routeActions.clearDestination()

      expect(store.getDestination()).to.be.null
    })

    it('should return null for empty destination', () => {
      const store = new RouteStore(services)

      expect(store.getDestination()).to.be.null
    })
  })

  describe('route data', () => {
    it('should set route data', () => {
      const routes = [ TestUtils.createRoute() ]
      const store = new RouteStore(services)

      routeActions.setRoutes(routes)

      expect(store.getRoutes()).to.equal(routes)
    })

    it('should clear route data', () => {
      const routes = [ TestUtils.createRoute() ]
      const store = new RouteStore(services)

      routeActions.setRoutes(routes)
      routeActions.clearRoutes()

      expect(store.getRoutes()).to.deep.equal([])
    })

    it('should return empty routes when not set', () => {
      const store = new RouteStore(services)

      expect(store.getRoutes()).to.deep.equal([])
    })
  })

  describe('requests', () => {
    it('should set pending request for route', () => {
      const store = new RouteStore(services)

      routeActions.startRouteRequest()

      expect(store.isRouteRequestPending()).to.be.true
    })

    it('should clear pending request for route', () => {
      const store = new RouteStore(services)

      routeActions.startRouteRequest()
      routeActions.stopRouteRequest()

      expect(store.isRouteRequestPending()).to.be.false
    })

    it('should not have pending route request by default', () => {
      const store = new RouteStore(services)

      expect(store.isRouteRequestPending()).to.be.false
    })

    it('should set pending request error for route', () => {
      const error = new Error('test error')
      const store = new RouteStore(services)

      routeActions.setRouteRequestError(error)

      expect(store.getRouteRequestError()).to.be.equal(error)
    })

    it('should clear request error for route', () => {
      const error = new Error('test error')
      const store = new RouteStore(services)

      routeActions.setRouteRequestError(error)
      routeActions.clearRouteRequestError()

      expect(store.getRouteRequestError()).to.be.null
    })

    it('should not have pending route request by default', () => {
      const store = new RouteStore(services)

      expect(store.getRouteRequestError()).to.be.null
    })
  })
})
