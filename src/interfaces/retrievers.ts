import { LngLat } from 'mapbox-gl'

import { Route } from './route'

export interface IRouteRetriever {
  fetchRoute(origin: LngLat, destination: LngLat): Promise<Array<Route>>,
}
