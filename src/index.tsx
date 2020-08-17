import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/app';
import ioc from './ioc/'
import * as serviceWorker from './serviceWorker';

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

const boot = () => {
  ioc.configActions.setProperty('token', 'abcd')

  // NOTE: Attach to window object for debugging purposes
  window.services = { ...ioc }

  render()
}

boot()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
