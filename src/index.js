import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import kanbanReducers from './reducers';
import './index.css';
import './reset.css';

const store = createStore(
  kanbanReducers
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
