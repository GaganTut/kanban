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
    <div className="whole-app">
      <div className="main-title">
        <h1>Kanban</h1>
        <h3>Keepin' it simple</h3>
        <Login />
      </div>
      <Route exact path="/" component={App} />
      <Route path="/signup" component={Signup} />
      <CardForm/>
    </div>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
