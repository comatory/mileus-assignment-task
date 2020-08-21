import { expect } from 'chai'
import { Dispatcher } from 'flux'

import MapManager from '../map-manager'

import { GraphActions, RouteActions } from '../../actions'
import MockRouteRetriever from '../../../mocks/retrievers/route-retriever.mock'
import MockRouteStore from '../../../mocks/stores/route-store.mock'
import { Action, IRouteStore } from '../../../interfaces/stores'
import { IRouteRetriever } from '../../../interfaces/retrievers'

interface TestServices {
  routeActions: RouteActions,
  graphActions: GraphActions,
  routeRetriever: IRouteRetriever,
  routeStore: IRouteStore,
}

describe('MapManager', () => {
  let services: TestServices
  let dispatcher: Dispatcher<Action>

  beforeEach(() => {
    dispatcher = new Dispatcher()

    services = {
      routeActions: new RouteActions({ dispatcher }),
      graphActions: new GraphActions({ dispatcher }),
      routeRetriever: new MockRouteRetriever(),
      routeStore: new MockRouteStore(),
    }
  })

  const createMapManager = () => {
    return new MapManager(services)
  }

  it('should create instance of MapManager', () => {
    const manager = createMapManager()

    expect(manager).to.be.instanceOf(MapManager)
  })
})
