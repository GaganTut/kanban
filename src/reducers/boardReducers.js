/*jshint esversion: 6*/

import * as types from '../constants';

const initialState = {
  allCards: []
};

const cards = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_CARDS :
      return Object.assign({}, state, {
        allCards: action.cards
      });

    case types.DELETE_CARD :
      return Object.assign({}, state, {
        allCards: state.allCards.filter(card => card.id !== action.id),
      });

    case types.UPDATE_CARD :
      return Object.assign({}, state, {
        allCards: state.allCards.filter(card => card.id !== action.card.id).concat([action.card])
      });

    default:
      return state;
  }
};

export default cards;