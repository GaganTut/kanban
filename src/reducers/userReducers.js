/*jshint esversion: 6*/

import * as types from '../constants';

const initialState = {
  loggedIn: false,
  loggedUsername: null,
  loggedFirstname: null,
  loggedLastname: null
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN :
      return Object.assign({}, state, {
        loggedIn: true,
        loggedUsername: action.user.username,
        loggedFirstname: action.user.firstname,
        loggedLastname: action.user.lastname,
      });

    case types.LOG_OUT :
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};

export default users;