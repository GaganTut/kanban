/*jshint esversion: 6*/

import * as types from '../constants';

const initialState = {
  loggedIn: false,
  loggedEmail: null,
  loggedFullname: null
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN :
      return Object.assign({}, state, {
        loggedIn: true,
        loggedEmail: action.user.email,
        loggedFullname: action.user.fullname
      });

    case types.LOG_OUT :
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};

export default users;