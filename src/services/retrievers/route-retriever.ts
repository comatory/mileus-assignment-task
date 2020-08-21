import { LngLat } from 'mapbox-gl'

import { IApiClient } from '../../interfaces/apis'
import UrlUtils from '../../utils/url-utils'
import { RouteResponse, Route } from '../../interfaces/route'

export default class RouteRetriever {
  private _apiClient: IApiClient

  constructor(services: {
    apiClient: IApiClient
  }) {
    this._apiClient = services.apiClient
  }

  public async fetchRoute(
    origin: LngLat,
    destination: LngLat
  ): Promise<Array<Route>> {
    const url = UrlUtils.createOSRMUrl(origin, destination)
    const results = await this._apiClient.get(url) as RouteResponse

    if (results.error) {
      throw new Error('RouteRetriever#fetchRoute -> Error in response data.')
    }

    const { routes } = results.data
    return routes
  }
}
