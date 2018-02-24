import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './styles/index.css';
import App from './containers/App'
import store from './store/configureStore'


ReactDOM.render(
  <Provider store={store}>
    <div>
      <App/>
    </div>
  </Provider>,
  document.getElementById('root')
);
