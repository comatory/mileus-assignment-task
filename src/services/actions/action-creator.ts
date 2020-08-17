import { Dispatcher } from 'flux'
import { Action } from '../../interfaces/stores'

export default class ActionCreator {
  _dispatcher: Dispatcher<Action>

  constructor(services: {
    dispatcher: Dispatcher<Action>
  }) {
    this._dispatcher = services.dispatcher
  }

  dispatch(action: Action) {
    console.info(action)
    this._dispatcher.dispatch(action)
  }
}

