import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import reducers from './reducers';
import './index.css';
import './reset.css';

const store = createStore(
  reducers,
  applyMiddleware(ReduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={App} />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
