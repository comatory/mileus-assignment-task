import { Dispatcher } from 'flux'
import { ReduceStore } from 'flux/utils'
import { LngLat } from 'mapbox-gl'
import {
  SetOriginAction,
  SetDestinationAction,
  ClearOriginAction,
  ClearDestinationAction,
  SetRouteRequestActions,
  SetRouteRequestFinishedAction,
  SetRouteRequestErrorAction,
  SetRoutesAction,
  ClearRoutesAction,
  ROUTE_ACTIONS_TYPES,
} from '../actions/route-actions'
import { Route } from '../../interfaces/route'

interface State {
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

const initialState: State = defaults

type RouteAction = (
  SetOriginAction |
  SetDestinationAction |
  ClearOriginAction |
  ClearDestinationAction |
  SetRouteRequestActions |
  SetRouteRequestFinishedAction |
  SetRouteRequestErrorAction |
  SetRoutesAction |
  ClearRoutesAction
)

export default class RouteStore extends ReduceStore<State, RouteAction> {
  constructor(services: {
    dispatcher: Dispatcher<RouteAction>,
  }) {
    super(services.dispatcher)
  }

  getInitialState(): State {
    return initialState
  }

  reduce(state: State, action: RouteAction): State {
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

  public getOrigin(): LngLat | null {
    return this.getState().origin
  }

  public getDestination(): LngLat | null {
    return this.getState().destination
  }

  public isRouteRequestPending(): boolean {
    return this.getState().routeRequest
  }

  public getRouteRequestError(): Error | null {
    return this.getState().routeRequestError
  }
}

