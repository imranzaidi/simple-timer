import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger(),
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store;

if (process.env.REACT_APP_ENV === 'development') {
  store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(loggerMiddleware)),
  );
} else {
  store = createStore(
    rootReducer
  );
}


export default store
