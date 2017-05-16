/*jshint esversion: 6*/

import * as types from '../constants';

const initialState = {
  allCards: [],
  fetching: false,
  loggedIn: localStorage.loggedIn || false,
  loggedUsername: localStorage.username || '',
  loggedFirstname: localStorage.firstname || '',
  loggedLastname: localStorage.lastname || ''
};

const cards = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_IN_PROGRESS:
      return Object.assign({}, state, {
        fetching: true
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

    case types.LOG_IN :
      return Object.assign({}, state, {
        loggedIn: true,
        loggedUsername: action.user.username,
        loggedFirstname: action.user.firstname,
        loggedLastname: action.user.lastname
      });

    case types.LOG_OUT :
      return Object.assign({}, state, {
        loggedIn: false,
        loggedUsername: '',
        loggedFirstname: '',
        loggedLastname: ''
      });

    default:
      return state;
  }
};

export default cards;