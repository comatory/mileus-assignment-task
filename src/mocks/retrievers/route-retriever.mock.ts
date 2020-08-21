import sinon from 'sinon'

import { Route } from '../../interfaces/route'
import { IRouteRetriever } from '../../interfaces/retrievers'

const DEFAULT_ROUTE_DATA: Array<Route> = []

export default class MockRouteRetriever implements IRouteRetriever {
  fetchRoute = sinon.stub().returns(Promise.resolve(DEFAULT_ROUTE_DATA))
}
