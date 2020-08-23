import { Dispatcher } from 'flux'
import { ReduceStore } from 'flux/utils'
import {
  SetGraphDataAction,
  ClearGraphDataAction,
  SetGraphAnimationPlayAction,
  SetGraphAnimationPauseAction,
  SetGraphAnimationFinishedAction,
  SetGraphAnimationMultiplicationAction,
  GRAPH_ACTION_TYPES,
} from '../actions/graph-actions'
import { Graph } from '../../interfaces/graph'
import { DEFAULT_MULTIPLICATION_FACTOR } from '../../constants'

interface State {
  data: Graph | null,
  isAnimationPlaying: boolean,
  multiplication: number,
}

const defaults: State = {
  data: null,
  isAnimationPlaying: false,
  multiplication: DEFAULT_MULTIPLICATION_FACTOR,
}

const initialState: State = defaults

type GraphAction = (
  SetGraphDataAction |
  ClearGraphDataAction |
  SetGraphAnimationPlayAction |
  SetGraphAnimationPauseAction |
  SetGraphAnimationFinishedAction |
  SetGraphAnimationMultiplicationAction
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
      case GRAPH_ACTION_TYPES.GRAPH_ACTION_MULTIPLICATION_SET:
        const setMultiplicationGraphAction = action as SetGraphAnimationMultiplicationAction
        const { multiplication } = setMultiplicationGraphAction.data

        return {
           ...state,
          multiplication,
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

  getMultiplicationFactor(): number {
    return this.getState().multiplication
  }
}

