import {
  SetGraphDataAction,
  SetGraphAnimationMultiplicationAction,
  RegisterGraphCanvasAction,
  GraphActionCreators,
  GRAPH_ACTION_TYPES,
} from '../services/actions/graph'
import { Graph } from '../interfaces/graph'
import { DEFAULT_MULTIPLICATION_FACTOR } from '../constants'

export interface State {
  data: Graph | null,
  canvas: HTMLCanvasElement | null,
  isAnimationPlaying: boolean,
  multiplication: number,
}

export const getInitialState = (): State => {
  return {
    data: null,
    canvas: null,
    isAnimationPlaying: false,
    multiplication: DEFAULT_MULTIPLICATION_FACTOR,
  }
}

const graphReducer = (state: State = getInitialState(), action: GraphActionCreators): State => {
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
    case GRAPH_ACTION_TYPES.GRAPH_ACTION_CANVAS_REGISTER:
      const registerCanvasAction = action as RegisterGraphCanvasAction
      const { canvas } = registerCanvasAction.data

      return {
        ...state,
        canvas,
      }
    case GRAPH_ACTION_TYPES.GRAPH_ACTION_CANVAS_UNREGISTER:
      return {
        ...state,
        canvas: null,
      }
    default:
      return state
  }
}

export default graphReducer
