import configReducer from './config-reducer'
import graphReducer from './graph-reducer'
import mapReducer from './map-reducer'
import routeReducer from './route-reducer'

const reducers = {
  config: configReducer,
  graph: graphReducer,
  map: mapReducer,
  route: routeReducer,
}

export default reducers
