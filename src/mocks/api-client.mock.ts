import sinon from 'sinon'

import { ResponseDescriptor, IApiClient } from '../interfaces/apis'

const DEFAULT_ROUTE_RESPONSE: ResponseDescriptor = {
  data: {
    routes: []
  },
  error: null,
  statusCode: 200,
  responseText: '',
}

export default class MockApiClient implements IApiClient {
  get = sinon.stub().returns(Promise.resolve(DEFAULT_ROUTE_RESPONSE))
}
