import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/app';
import ioc from './ioc/'
import * as serviceWorker from './serviceWorker';
import store from './store'
import { Provider } from 'react-redux'

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

const boot = () => {
  // NOTE: Set up mapbox
  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN

  if (mapboxToken) {
    ioc.mapActions.initialize(mapboxToken)
    store.dispatch(ioc.configActions.setProperty('mapboxToken', mapboxToken))
  }

  // NOTE: Attach to window object for debugging purposes
  window.services = { ...ioc }

  render()
}

boot()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
