import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import DevTools from '../containers/DevTools'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger(),
  devToolsMiddleware = DevTools.instrument();

let store;

if (process.env.REACT_APP_ENV === 'development') {
  store = createStore(
    rootReducer,
    compose(devToolsMiddleware),
    applyMiddleware(loggerMiddleware)
  );
} else {
  store = createStore(
    rootReducer,
    compose(devToolsMiddleware)
  );
}



export default store
