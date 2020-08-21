import { expect } from 'chai'
import { LngLat } from 'mapbox-gl'

import RouteRetriever from '../route-retriever'
import MockApiClient from '../../../mocks/api-client.mock'
import UrlUtils from '../../../utils/url-utils'
import TestUtils from '../../../utils/test-utils'

interface TestServices {
  apiClient: MockApiClient,
}

describe('RouteRetriever', () => {
  let services: TestServices

  beforeEach(() => {
    services = {
      apiClient: new MockApiClient(),
    }
  })

  it('should create instance of RouteRetriever', () => {
    const retriever = new RouteRetriever(services)

    expect(retriever).to.be.instanceOf(RouteRetriever)
  })

  it('should retrieve route data from API', async () => {
    const origin = new LngLat(1.1, 1.2)
    const destination = new LngLat(1.1, 1.2)
    const url = UrlUtils.createOSRMUrl(origin, destination)
    const routes = [ TestUtils.createRoute() ]

    services.apiClient.get.withArgs(url).returns(Promise.resolve({
      data: { routes },
      error: null,
      statusCode: 200,
      responseText: '',
    }))
    const retriever = new RouteRetriever(services)

    const updatedRoutes = await retriever.fetchRoute(origin, destination)

    expect(updatedRoutes).to.equal(routes)
  })

  it('should throw error when error field is present in response',  async (callback) => {
    const origin = new LngLat(1.1, 1.2)
    const destination = new LngLat(1.1, 1.2)
    const url = UrlUtils.createOSRMUrl(origin, destination)

    services.apiClient.get.withArgs(url).returns(Promise.resolve({
      data: { routes: [] },
      error: 'Some error',
      statusCode: 500,
      responseText: '',
    }))
    const retriever = new RouteRetriever(services)

    try {
      await retriever.fetchRoute(origin, destination)
    } catch (e) {
      callback()
    }
  })
})

