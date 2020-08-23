import { Dispatcher } from 'flux'
import { ReduceStore } from 'flux/utils'
import {
  SetGraphDataAction,
  ClearGraphDataAction,
  SetGraphAnimationPlayAction,
  SetGraphAnimationPauseAction,
  SetGraphAnimationFinishedAction,
  GRAPH_ACTION_TYPES,
} from '../actions/graph-actions'
import { Graph } from '../../interfaces/graph'

interface State {
  data: Graph | null,
  isAnimationPlaying: boolean,
}

const defaults: State = {
  data: null,
  isAnimationPlaying: false,
}

const initialState: State = defaults

type GraphAction = (
  SetGraphDataAction |
  ClearGraphDataAction |
  SetGraphAnimationPlayAction |
  SetGraphAnimationPauseAction |
  SetGraphAnimationFinishedAction
)

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
      case GRAPH_ACTION_TYPES.GRAPH_ACTION_ANIMATION_PLAY:
        return {
          ...state,
          isAnimationPlaying: true,
        }
      case GRAPH_ACTION_TYPES.GRAPH_ACTION_ANIMATION_PAUSE:
      case GRAPH_ACTION_TYPES.GRAPH_ACTION_ANIMATION_FINISHED:
        return {
          ...state,
          isAnimationPlaying: false,
        }
      default:
        return state
    }
  }

  getGraphData(): Graph | null {
    return this.getState().data
  }

  isAnimationPlaying(): boolean {
    return this.getState().isAnimationPlaying
  }
}

