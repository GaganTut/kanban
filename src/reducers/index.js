/*jshint esversion: 6*/

import * as types from '../constants';

const initialState = {
  queueCards: [],
  progressCards: [],
  completedCards: []
};

const cards = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_CARDS :
      return Object.assign({}, state, {
        queueCards: action.cards.filter(card => card.status === 'Queue'),
        progressCards: action.cards.filter(card => card.status === 'Progress'),
        completedCards: action.cards.filter(card => card.status === 'Completed')
      });

    case types.DELETE_CARD :
      return Object.assign({}, state, {
        queueCards: state.queueCards.filter(card => card.id !== action.id),
        progressCards: state.progressCards.filter(card => card.id !== action.id),
        completedCards: state.completedCards.filter(card => card.id !== action.id)
      });

    case types.UPDATE_CARD :
      switch (action.card.status) {
        case 'Queue':
          return Object.assign({}, state, {
            queueCards: state.queueCards.filter(card => card.id !== action.id).push(action.card),
            progressCards: state.progressCards.filter(card => card.id !== action.id),
            completedCards: state.completedCards.filter(card => card.id !== action.id)
          });
        case 'Progress':
          return Object.assign({}, state, {
            queueCards: state.queueCards.filter(card => card.id !== action.id),
            progressCards: state.progressCards.filter(card => card.id !== action.id).push(action.card),
            completedCards: state.completedCards.filter(card => card.id !== action.id)
          });
        case 'Completed':
          return Object.assign({}, state, {
            queueCards: state.queueCards.filter(card => card.id !== action.id),
            progressCards: state.progressCards.filter(card => card.id !== action.id),
            completedCards: state.completedCards.filter(card => card.id !== action.id).push(action.card)
          });
      }
    default:
      return state;
  }
};

export default cards;