import ActionCreator from './action-creator'
import { Action } from '../../interfaces/stores'

import { Graph } from '../../interfaces/graph'

export const GRAPH_ACTION_SET_DATA = 'GRAPH_ACTION_SET_DATA'
export const GRAPH_ACTION_CLEAR_DATA = 'GRAPH_ACTION_CLEAR_DATA'

export const GRAPH_ACTION_TYPES = {
  [GRAPH_ACTION_SET_DATA]: GRAPH_ACTION_SET_DATA,
  [GRAPH_ACTION_CLEAR_DATA]: GRAPH_ACTION_CLEAR_DATA,
}

export interface  SetGraphDataAction extends Action {
  type: typeof GRAPH_ACTION_SET_DATA,
  data: Graph,
}

export interface  ClearGraphDataAction extends Action {
  type: typeof GRAPH_ACTION_SET_DATA,
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
}
