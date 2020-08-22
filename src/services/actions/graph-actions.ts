import ActionCreator from './action-creator'
import { Action } from '../../interfaces/stores'

import { Graph } from '../../interfaces/graph'

export const GRAPH_ACTION_SET_DATA = 'GRAPH_ACTION_SET_DATA'
export const GRAPH_ACTION_CLEAR_DATA = 'GRAPH_ACTION_CLEAR_DATA'
export const GRAPH_ACTION_ANIMATION_PLAY = 'GRAPH_ACTION_ANIMATION_PLAY'
export const GRAPH_ACTION_ANIMATION_PAUSE = 'GRAPH_ACTION_ANIMATION_PAUSE'

export const GRAPH_ACTION_TYPES = {
  [GRAPH_ACTION_SET_DATA]: GRAPH_ACTION_SET_DATA,
  [GRAPH_ACTION_CLEAR_DATA]: GRAPH_ACTION_CLEAR_DATA,
  [GRAPH_ACTION_ANIMATION_PLAY]: GRAPH_ACTION_ANIMATION_PLAY,
  [GRAPH_ACTION_ANIMATION_PAUSE]: GRAPH_ACTION_ANIMATION_PAUSE,
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

export default class GraphActions extends ActionCreator {
  setData(data: Graph) {
    this.dispatch({
      type: GRAPH_ACTION_SET_DATA,
      data,
    })
  }

  clearData() {
    this.dispatch({
      type: GRAPH_ACTION_CLEAR_DATA,
      data: {},
    })
  }

  playAnimation() {
    this.dispatch({
      type: GRAPH_ACTION_ANIMATION_PLAY,
      data: {},
    })
  }

  pauseAnimation() {
    this.dispatch({
      type: GRAPH_ACTION_ANIMATION_PAUSE,
      data: {},
    })
  }
}
