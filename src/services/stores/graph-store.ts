import { Dispatcher } from 'flux'
import { ReduceStore } from 'flux/utils'
import {
  SetGraphDataAction,
  ClearGraphDataAction,
  GRAPH_ACTION_TYPES,
} from '../actions/graph-actions'
import { Graph } from '../../interfaces/graph'

interface State {
  data: Graph | null,
}

const defaults: State = {
  data: null
}

const initialState: State = defaults

type GraphAction = SetGraphDataAction | ClearGraphDataAction

export default class GraphStore extends ReduceStore<State, GraphAction> {
  constructor(services: {
    dispatcher: Dispatcher<GraphAction>,
  }) {
    super(services.dispatcher)
  }

  getInitialState(): State {
    return initialState
  }

  reduce(state: State, action: GraphAction): State {
    switch (action.type) {
      case GRAPH_ACTION_TYPES.GRAPH_ACTION_SET_DATA:
        const setGraphDataAction = action as SetGraphDataAction
        const { data } = setGraphDataAction
        return {
          ...state,
          data,
        }
      case GRAPH_ACTION_TYPES.GRAPH_ACTION_CLEAR_DATA:
        return {
          ...state,
          data: null,
        }
      default:
        return state
    }
  }

  getGraphData(): Graph | null {
    return this.getState().data
  }
}

