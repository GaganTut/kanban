import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import boardReducers from './reducers/boardReducers';
import customMiddleare from './middleware';
import './index.css';
import './reset.css';

const store = createStore(
  boardReducers,
  applyMiddleware(customMiddleare)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
