/*jshint esversion: 6*/

import * as types from '../constants';

const initialState = {
  allCards: [],
  fetching: false,
  hasError: false,
  errorMessage: ''
};

const cards = (state = initialState, action) => {
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

    case types.LOAD_CARDS :
      return Object.assign({}, state, {
        allCards: action.cards,
        fetching: false
      });

    case types.DELETE_CARD :
      return Object.assign({}, state, {
        allCards: state.allCards.filter(card => card.id !== action.id),
        fetching: false
      });

    case types.UPDATE_CARD :
      return Object.assign({}, state, {
        allCards: state.allCards.filter(card => card.id !== action.card.id).concat([action.card]),
        fetching: false
      });

    case types.ADD_CARD :
      return Object.assign({}, state, {
        allCards: state.allCards.concat([action.card]),
        fetching: false
      });

    default:
      return state;
  }
};

export default cards;