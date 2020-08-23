import { expect } from 'chai'
import { Dispatcher } from 'flux'
import mapboxgl, { Map, LngLat } from 'mapbox-gl'

import MapManager from '../map-manager'

import GraphActions, { GRAPH_ACTION_TYPES } from '../../actions/graph-actions'
import RouteActions, { ROUTE_ACTIONS_TYPES } from '../../actions/route-actions'
import MockRouteRetriever from '../../../mocks/retrievers/route-retriever.mock'
import MockRouteStore from '../../../mocks/stores/route-store.mock'
import mockMapFactory, { getMap } from '../../../mocks/factories/map-factory.mock'
import { IMapFactory } from '../../../interfaces/map'
import { Action, IRouteStore } from '../../../interfaces/stores'
import { IRouteRetriever } from '../../../interfaces/retrievers'
import TestUtils from '../../../utils/test-utils'

// NOTE: In real app I would probably create a mock of "Map" object from Mapbox so I do not need to override methosd like this
mapboxgl.accessToken = 'abcd'

interface TestServices {
  graphActions: GraphActions,
  mapFactory: IMapFactory,
  routeActions: RouteActions,
  routeRetriever: IRouteRetriever,
  routeStore: IRouteStore,
}

describe('MapManager', () => {
  let services: TestServices
  let dispatcher: Dispatcher<Action>

  beforeEach(() => {
    dispatcher = new Dispatcher()

    services = {
      graphActions: new GraphActions({ dispatcher }),
      mapFactory: mockMapFactory(),
      routeActions: new RouteActions({ dispatcher }),
      routeRetriever: new MockRouteRetriever(),
      routeStore: new MockRouteStore(),
    }
  })

  const createMapManager = () => {
    const manager = new MapManager(services)
    manager.initialize('abcd')

    return manager
  }

  const createMapManagerWithMap = () => {
    const node = document.createElement('test')
    node.setAttribute('id', 'test')
    document.body.appendChild(node)

    const manager = new MapManager(services)
    manager.initialize('abcd')

    manager.createMap(node)

    return manager
  }

  it('should create instance of MapManager', () => {
    const manager = createMapManager()

    expect(manager).to.be.instanceOf(MapManager)
  })

  it('should create map', () => {
    const node = document.createElement('div')
    node.setAttribute('id', 'test-map')
    document.body.appendChild(node)

    const manager = createMapManager()
    manager.createMap(node)

    const map = getMap()
    expect(map).to.be.instanceOf(Map)
  })

  describe('adding markers', () => {
    describe('origin marker', () => {
      it('should dispatch action to set origin on click', (callback) => {
        const manager = createMapManagerWithMap()

        const map = getMap()
        const canvas = map.getCanvas()

        dispatcher.register((action) => {
          if (action.type === ROUTE_ACTIONS_TYPES.ROUTE_ACTION_SET_ORIGIN) {
            expect(action.data.origin).to.be.instanceOf(LngLat)
            callback()
          }
        })

        canvas.click()
      })

      it('should dispatch action to set origin when calling public ' +
         'add method', (callback) => {
        const manager = createMapManagerWithMap()

        const lngLat = new LngLat(1.1, 1.2)

        dispatcher.register((action) => {
          if (action.type === ROUTE_ACTIONS_TYPES.ROUTE_ACTION_SET_ORIGIN) {
            expect(action.data.origin).to.be.equal(lngLat)
            callback()
          }
        })

        manager.addOriginMarker(lngLat)
      })

      it('should dispatch action to clear previous origin when ' +
         'adding origin again', (callback) => {
        const manager = createMapManagerWithMap()

        const lngLat = new LngLat(1.1, 1.2)

        dispatcher.register((action) => {
          if (action.type === ROUTE_ACTIONS_TYPES.ROUTE_ACTION_CLEAR_ORIGIN) {
            callback()
          }
        })

        manager.addOriginMarker(lngLat)
        manager.addOriginMarker(lngLat)
      })

      it('should dispatch action to clear request error when ' +
         'adding origin again', (callback) => {
        const manager = createMapManagerWithMap()

        const lngLat = new LngLat(1.1, 1.2)

        dispatcher.register((action) => {
          if (action.type === ROUTE_ACTIONS_TYPES.ROUTE_ACTION_REQUEST_ERROR_CLEAR) {
            callback()
          }
        })

        manager.addOriginMarker(lngLat)
        manager.addOriginMarker(lngLat)
      })

      it('should dispatch action to clear routes when ' +
         'adding origin again', (callback) => {
        const manager = createMapManagerWithMap()

        const lngLat = new LngLat(1.1, 1.2)

        dispatcher.register((action) => {
          if (action.type === ROUTE_ACTIONS_TYPES.ROUTE_ACTION_ROUTES_CLEAR) {
            callback()
          }
        })

        manager.addOriginMarker(lngLat)
        manager.addOriginMarker(lngLat)
      })

      it('should dispatch action to clear graph data when ' +
         'adding origin again', (callback) => {
        const manager = createMapManagerWithMap()

        const lngLat = new LngLat(1.1, 1.2)

        dispatcher.register((action) => {
          if (action.type === GRAPH_ACTION_TYPES.GRAPH_ACTION_CLEAR_DATA) {
            callback()
          }
        })

        manager.addOriginMarker(lngLat)
        manager.addOriginMarker(lngLat)
      })
    })

    describe('destination marker', () => {
      it('should dispatch action to set destination on second click', (callback) => {
        const manager = createMapManagerWithMap()

        const map = getMap()
        const canvas = map.getCanvas()

        dispatcher.register((action) => {
          if (action.type === ROUTE_ACTIONS_TYPES.ROUTE_ACTION_SET_DESTINATION) {
            expect(action.data.destination).to.be.instanceOf(LngLat)
            callback()
          }
        })

        canvas.click()
        canvas.click()
      })

      it('should dispatch action to set destination when calling ' +
         'public add method', (callback) => {
        const manager = createMapManagerWithMap()

        const lngLat = new LngLat(1.1, 1.2)

        dispatcher.register((action) => {
          if (action.type === ROUTE_ACTIONS_TYPES.ROUTE_ACTION_SET_DESTINATION) {
            expect(action.data.destination).to.be.equal(lngLat)
            callback()
          }
        })

        manager.addDestinationMarker(lngLat)
      })

      it('should dispatch action to clear previous destination when ' +
         'adding destination again', (callback) => {
        const manager = createMapManagerWithMap()

        const lngLat = new LngLat(1.1, 1.2)

        dispatcher.register((action) => {
          if (action.type === ROUTE_ACTIONS_TYPES.ROUTE_ACTION_CLEAR_DESTINATION) {
            callback()
          }
        })

        manager.addDestinationMarker(lngLat)
        manager.addDestinationMarker(lngLat)
      })

      it('should dispatch action to clear request error when ' +
         'adding destination again', (callback) => {
        const manager = createMapManagerWithMap()

        const lngLat = new LngLat(1.1, 1.2)

        dispatcher.register((action) => {
          if (action.type === ROUTE_ACTIONS_TYPES.ROUTE_ACTION_REQUEST_ERROR_CLEAR) {
            callback()
          }
        })

        manager.addDestinationMarker(lngLat)
        manager.addDestinationMarker(lngLat)
      })

      it('should dispatch action to clear routes when ' +
         'adding destination again', (callback) => {
        const manager = createMapManagerWithMap()

        const lngLat = new LngLat(1.1, 1.2)

        dispatcher.register((action) => {
          if (action.type === ROUTE_ACTIONS_TYPES.ROUTE_ACTION_ROUTES_CLEAR) {
            callback()
          }
        })

        manager.addDestinationMarker(lngLat)
        manager.addDestinationMarker(lngLat)
      })

      it('should dispatch action to clear graph data when ' +
         'adding destination again', (callback) => {
        const manager = createMapManagerWithMap()

        const lngLat = new LngLat(1.1, 1.2)

        dispatcher.register((action) => {
          if (action.type === GRAPH_ACTION_TYPES.GRAPH_ACTION_CLEAR_DATA) {
            callback()
          }
        })

        manager.addDestinationMarker(lngLat)
        manager.addDestinationMarker(lngLat)
      })
    })

    describe('move map', () => {
      it('should move map when setting origin', (callback) => {
        const lngLat = new LngLat(-14.4, 10.2)
        const node = document.createElement('div')
        node.setAttribute('id', 'test-map')
        document.body.appendChild(node)

        const manager = createMapManager()
        manager.createMap(node)
        manager.addOriginMarker(lngLat)

        const map = getMap()
        map.on('movestart', () => {
          callback()
        })

        manager.moveToOrigin()
      })

      it('should move map when setting destination', (callback) => {
        const lngLat = new LngLat(-14.4, 10.2)
        const node = document.createElement('div')
        node.setAttribute('id', 'test-map')
        document.body.appendChild(node)

        const manager = createMapManager()
        manager.createMap(node)
        manager.addDestinationMarker(lngLat)

        const map = getMap()
        map.on('movestart', () => {
          callback()
        })

        manager.moveToDestination()
      })
    })

    describe('find route', () => {
      it('should dispatch action to start request', (callback) => {
        const origin = new LngLat(1.1, 1.2)
        const destination = new LngLat(1.1, 1.2)
        const manager = createMapManagerWithMap()

        dispatcher.register((action) => {
          if (action.type === ROUTE_ACTIONS_TYPES.ROUTE_ACTION_REQUEST) {
            callback()
          }
        })

        manager.findRoute(origin, destination)
      })

      it('should dispatch action to stop request', (callback) => {
        const origin = new LngLat(1.1, 1.2)
        const destination = new LngLat(1.1, 1.2)
        const manager = createMapManagerWithMap()

        dispatcher.register((action) => {
          if (action.type === ROUTE_ACTIONS_TYPES.ROUTE_ACTION_REQUEST_FINISHED) {
            callback()
          }
        })

        manager.findRoute(origin, destination)
      })

      it('should dispatch action to set retrieved routes from API', (callback) => {
        const origin = new LngLat(1.1, 1.2)
        const destination = new LngLat(1.1, 1.2)
        const testRouteResponse = [ TestUtils.createRoute() ]
        services.routeRetriever
          .fetchRoute
          // @ts-ignore: I'd deal with this by adding correct types to RouteRetrieverMock
          .withArgs(origin, destination)
          .returns(Promise.resolve(testRouteResponse))

        const manager = createMapManagerWithMap()

        dispatcher.register((action) => {
          if (action.type === ROUTE_ACTIONS_TYPES.ROUTE_ACTION_ROUTES_SET) {
            expect(action.data.routes).to.equal(testRouteResponse)
            callback()
          }
        })

        manager.findRoute(origin, destination)
      })

      it('should dispatch action to set graph date based on route data', (callback) => {
        const origin = new LngLat(1.1, 1.2)
        const destination = new LngLat(1.1, 1.2)
        const testRouteResponse = [ TestUtils.createRoute() ]
        services.routeRetriever
          .fetchRoute
          // @ts-ignore: I'd deal with this by adding correct types to RouteRetrieverMock
          .withArgs(origin, destination)
          .returns(Promise.resolve(testRouteResponse))

        const manager = createMapManagerWithMap()

        dispatcher.register((action) => {
          if (action.type === GRAPH_ACTION_TYPES.GRAPH_ACTION_SET_DATA) {
            callback()
          }
        })

        manager.findRoute(origin, destination)
      })

      it('should dispatch action to error', (callback) => {
        const origin = new LngLat(1.1, 1.2)
        const destination = new LngLat(1.1, 1.2)
        const error = new Error('Failed in test.')
        services.routeRetriever
          .fetchRoute
          // @ts-ignore: I'd deal with this by adding correct types to RouteRetrieverMock
          .withArgs(origin, destination)
          .returns(Promise.reject(error))

        const manager = createMapManagerWithMap()

        dispatcher.register((action) => {
          if (action.type === ROUTE_ACTIONS_TYPES.ROUTE_ACTION_REQUEST_ERROR) {
            expect(action.data.error).to.equal(error)
            callback()
          }
        })

        manager.findRoute(origin, destination)
      })
    })
  })
})
