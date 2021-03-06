/*jshint esversion: 6*/

import * as types from '../constants';

const initialState = {
  fetching: false,
  hasError: false,
  errorMessage: '',
  showForm: false,
  showBoardForm: false,
  showCardForm: false,
  showLoginForm: false,
  showSignupForm: false,
  showPermissionForm: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_IN_PROGRESS:
      return Object.assign({}, state, {
        fetching: true
      });
    case types.FETCHING_DONE:
      return Object.assign({}, state, {
        fetching: false
      });

    case types.THROW_ERROR :
      return Object.assign({}, state, {
        hasError: true,
        errorMessage: action.error
      });

    case types.CLOSE_ERROR :
      return Object.assign({}, state, {
        hasError: false,
        errorMessage: ''
      });
    case types.OPEN_BOARD_FORM :
      return Object.assign({}, state, {
        showForm: true,
        showBoardForm: true,
        showCardForm: false,
        showLoginForm: false,
        showSignupForm: false,
        showPermissionForm: false
      });
    case types.OPEN_CARD_FORM :
      return Object.assign({}, state, {
        showForm: true,
        showBoardForm: false,
        showCardForm: true,
        showLoginForm: false,
        showSignupForm: false,
        showPermissionForm: false
      });
    case types.OPEN_LOGIN_FORM :
      return Object.assign({}, state, {
        showForm: true,
        showBoardForm: false,
        showCardForm: false,
        showLoginForm: true,
        showSignupForm: false,
        showPermissionForm: false
      });
    case types.OPEN_SIGNUP_FORM :
      return Object.assign({}, state, {
        showForm: true,
        showBoardForm: false,
        showCardForm: false,
        showLoginForm: false,
        showSignupForm: true,
        showPermissionForm: false
      });
    case types.OPEN_PERMISSION_FORM :
      return Object.assign({}, state, {
        showForm: true,
        showBoardForm: false,
        showCardForm: false,
        showLoginForm: false,
        showSignupForm: false,
        showPermissionForm: true
      });
    case types.CLOSE_FORMS :
      return Object.assign({}, state, {
        showForm: false,
        showBoardForm: false,
        showCardForm: false,
        showLoginForm: false,
        showSignupForm: false,
        showPermissionForm: false
      });
    default:
      return state;
  }
};