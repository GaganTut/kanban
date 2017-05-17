/*jshint esversion: 6*/

import * as types from '../constants';

const initialState = {
  loggedIn: localStorage.loggedIn || false,
  loggedUsername: localStorage.username || '',
  loggedFirstname: localStorage.firstname || '',
  loggedLastname: localStorage.lastname || '',
  userListOptions: []
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
      return Object.assign({}, state, {
        loggedIn: false,
        loggedUsername: '',
        loggedFirstname: '',
        loggedLastname: '',
      });

    case types.LOAD_USER_LIST :
      return Object.assign({}, state, {
        userListOptions: action.users
      });

    default:
      return state;
  }
};

export default users;