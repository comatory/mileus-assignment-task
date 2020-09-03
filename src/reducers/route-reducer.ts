import { LngLat } from 'mapbox-gl'
import {
  SetOriginAction,
  SetDestinationAction,
  SetRouteRequestErrorAction,
  SetRoutesAction,
  RouteActionCreators,
  ROUTE_ACTIONS_TYPES,
} from '../services/actions/route/action-creators'
import { Route } from '../interfaces/route'

export interface State {
  origin: LngLat | null,
  destination: LngLat | null,
  routeRequest: boolean,
  routeRequestError: Error | null,
  routes: Array<Route>,
}

const defaults: State = {
  origin: null,
  destination: null,
  routeRequest: false,
  routeRequestError: null,
  routes: [],
}

export const initialState: State = defaults

const routeReducer = (state: State = initialState, action: RouteActionCreators): State => {
  switch (action.type) {
    case ROUTE_ACTIONS_TYPES.ROUTE_ACTION_SET_ORIGIN:
      const setOriginAction = action as SetOriginAction
      const { origin } = setOriginAction.data

      return {
        ...state,
        origin,
      }
    case ROUTE_ACTIONS_TYPES.ROUTE_ACTION_SET_DESTINATION:
      const setDestinationAction = action as SetDestinationAction
      const { destination } = setDestinationAction.data

      return {
        ...state,
        destination,
      }
    case ROUTE_ACTIONS_TYPES.ROUTE_ACTION_CLEAR_ORIGIN:
      return {
         ...state,
         origin: null,
      }
    case ROUTE_ACTIONS_TYPES.ROUTE_ACTION_CLEAR_DESTINATION:
      return {
         ...state,
         destination: null,
      }
    case ROUTE_ACTIONS_TYPES.ROUTE_ACTION_REQUEST:
      return {
         ...state,
         routeRequest: true,
         routeRequestError: null,
      }
    case ROUTE_ACTIONS_TYPES.ROUTE_ACTION_REQUEST_FINISHED:
      return {
         ...state,
         routeRequest: false,
      }
    case ROUTE_ACTIONS_TYPES.ROUTE_ACTION_REQUEST_ERROR:
      const routeRequestErrorAction = action as SetRouteRequestErrorAction
      const { error } = routeRequestErrorAction.data

      return {
         ...state,
         routeRequestError: error,
      }
    case ROUTE_ACTIONS_TYPES.ROUTE_ACTION_REQUEST_ERROR_CLEAR:
      return {
        ...state,
        routeRequestError: null,
      }
    case ROUTE_ACTIONS_TYPES.ROUTE_ACTION_ROUTES_SET:
      const routesSetRequestAction = action as SetRoutesAction
      const { routes } = routesSetRequestAction.data

      return {
        ...state,
        routes,
      }
    case ROUTE_ACTIONS_TYPES.ROUTE_ACTION_ROUTES_CLEAR:
      return {
        ...state,
        routes: [],
      }
    default:
      return state
  }
}

export default routeReducer
