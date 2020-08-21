import { LngLat } from 'mapbox-gl'

import { Route } from './route'
import { IApiClient } from './apis'

export interface IRouteRetriever {
  fetchRoute(origin: LngLat, destination: LngLat): Promise<Array<Route>>,
}
