/*jshint esversion: 6*/

import * as types from '../constants';

const initialState = {
  fetching: false,
  hasError: false,
  errorMessage: ''
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

    default:
      return state;
  }
};