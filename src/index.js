/*jshint esversion: 6*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Signup from './containers/Signup';
import CardForm from './containers/CardForm';
import Login from './containers/Login';
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
    <div>
      <h1 className="main-title">Kanban Board</h1>
      <Login />
      <Route exact path="/" component={App} />
      <Route exact path="/signup" component={Signup} />
      <CardForm/>
    </div>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
