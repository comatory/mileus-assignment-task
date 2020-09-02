import { Action } from '../../../interfaces/actions'

import { Graph } from '../../../interfaces/graph'

export const GRAPH_ACTION_SET_DATA = 'GRAPH_ACTION_SET_DATA'
export const GRAPH_ACTION_CLEAR_DATA = 'GRAPH_ACTION_CLEAR_DATA'
export const GRAPH_ACTION_ANIMATION_PLAY = 'GRAPH_ACTION_ANIMATION_PLAY'
export const GRAPH_ACTION_ANIMATION_PAUSE = 'GRAPH_ACTION_ANIMATION_PAUSE'
export const GRAPH_ACTION_ANIMATION_FINISHED  = 'GRAPH_ACTION_ANIMATION_FINISHED'
export const GRAPH_ACTION_MULTIPLICATION_SET = 'GRAPH_ACTION_MULTIPLICATION_SET'
export const GRAPH_ACTION_CANVAS_REGISTER = 'GRAPH_ACTION_CANVAS_REGISTER'
export const GRAPH_ACTION_CANVAS_UNREGISTER = 'GRAPH_ACTION_CANVAS_UNREGISTER'

export const GRAPH_ACTION_TYPES = {
  [GRAPH_ACTION_SET_DATA]: GRAPH_ACTION_SET_DATA,
  [GRAPH_ACTION_CLEAR_DATA]: GRAPH_ACTION_CLEAR_DATA,
  [GRAPH_ACTION_ANIMATION_PLAY]: GRAPH_ACTION_ANIMATION_PLAY,
  [GRAPH_ACTION_ANIMATION_PAUSE]: GRAPH_ACTION_ANIMATION_PAUSE,
  [GRAPH_ACTION_ANIMATION_FINISHED]: GRAPH_ACTION_ANIMATION_FINISHED,
  [GRAPH_ACTION_MULTIPLICATION_SET]: GRAPH_ACTION_MULTIPLICATION_SET,
  [GRAPH_ACTION_CANVAS_REGISTER]: GRAPH_ACTION_CANVAS_REGISTER,
  [GRAPH_ACTION_CANVAS_UNREGISTER]: GRAPH_ACTION_CANVAS_UNREGISTER,
}

export interface  SetGraphDataAction extends Action {
  type: typeof GRAPH_ACTION_SET_DATA,
  data: Graph,
}

export interface  ClearGraphDataAction extends Action {
  type: typeof GRAPH_ACTION_SET_DATA,
}

export interface SetGraphAnimationPlayAction extends Action {
  type: typeof GRAPH_ACTION_ANIMATION_PLAY,
}

export interface SetGraphAnimationPauseAction extends Action {
  type: typeof GRAPH_ACTION_ANIMATION_PAUSE,
}

export interface SetGraphAnimationFinishedAction extends Action {
  type: typeof GRAPH_ACTION_ANIMATION_FINISHED,
}

export interface SetGraphAnimationMultiplicationAction extends Action {
  type: typeof GRAPH_ACTION_MULTIPLICATION_SET,
  data: { multiplication: number },
}

export interface RegisterGraphCanvasAction extends Action {
  type: typeof GRAPH_ACTION_CANVAS_REGISTER,
  data: { canvas: HTMLCanvasElement },
}

export interface UnregisterGraphCanvasAction extends Action {
  type: typeof GRAPH_ACTION_CANVAS_UNREGISTER,
}

export type GraphActionCreators = (
  SetGraphDataAction |
  ClearGraphDataAction |
  SetGraphAnimationPlayAction |
  SetGraphAnimationPauseAction |
  SetGraphAnimationFinishedAction |
  SetGraphAnimationMultiplicationAction |
  RegisterGraphCanvasAction |
  UnregisterGraphCanvasAction
)

export const setData = (data: Graph) => {
  return {
    type: GRAPH_ACTION_SET_DATA,
    data,
  }
}

export const clearData = () => {
  return {
    type: GRAPH_ACTION_CLEAR_DATA,
    data: {},
  }
}

export const playAnimation = () => {
  return {
    type: GRAPH_ACTION_ANIMATION_PLAY,
    data: {},
  }
}

export const pauseAnimation = () => {
  return {
    type: GRAPH_ACTION_ANIMATION_PAUSE,
    data: {},
  }
}

export const finishAnimation = () => {
  return {
    type: GRAPH_ACTION_ANIMATION_FINISHED,
    data: {},
  }
}

export const setMultiplication = (multiplication: number) => {
  return {
    type: GRAPH_ACTION_MULTIPLICATION_SET,
    data: { multiplication },
  }
}

export const registerCanvas = (canvas: HTMLCanvasElement) => {
  return {
    type: GRAPH_ACTION_CANVAS_REGISTER,
    data: { canvas },
  }
}

export const unregisterCanvas = () => {
  return {
    type: GRAPH_ACTION_CANVAS_UNREGISTER,
    data: {},
  }
}
