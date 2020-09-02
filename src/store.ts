import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import ioc from './ioc'
import reducers from './reducers'

// @ts-ignore
const logger = (store) => next => action => {
  console.info(action)
  return next(action)
}

const actionSanitizer = (action: any) => {
  console.log(action.type)
  if (action.data && action.data.map) {
    return {
      ...action,
      data: { map: '[omitted]' },
    }
  }

  return action
}

const composeEnhancers = composeWithDevTools({ actionSanitizer })
const combinedReducers = combineReducers(reducers)

const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(ioc), logger)),
)

export default store
