import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './styles/index.css';
import App from './containers/App'
import DevTools from './containers/DevTools'
import store from './store/configureStore'


const includeDevTools = () => {
  if (process.env.REACT_APP_ENV === 'development') {
    return (<DevTools/>);
  }

  return '';
};

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App/>
      {includeDevTools()}
    </div>
  </Provider>,
  document.getElementById('root')
);
