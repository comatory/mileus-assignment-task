import { Dispatcher } from 'flux'
import { ReduceStore } from 'flux/utils'
import { LngLat } from 'mapbox-gl'
import {
  SetOriginAction,
  SetDestinationAction,
  ClearOriginAction,
  ClearDestinationAction,
  ROUTE_ACTIONS_TYPES,
} from '../actions/route-actions'

interface State {
  origin: LngLat | null,
  destination: LngLat | null,
}

const defaults: State = {
  origin: null,
  destination: null,
}

const initialState: State = defaults

type RouteAction = (
  SetOriginAction |
  SetDestinationAction |
  ClearOriginAction |
  ClearDestinationAction
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
}

