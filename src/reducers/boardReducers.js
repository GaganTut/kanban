/*jshint esversion: 6*/

import * as types from '../constants';

const initialState = {
  allBoards: [],
  allCards: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case types.LOAD_BOARDS:
      return Object.assign({}, state, {
        allBoards: action.allBoards
      });

    case types.CREATE_BOARD:
      return Object.assign({}, state, {
        allBoards: action.boards
      });

    case types.LOAD_CARDS :
      return Object.assign({}, state, {
        allCards: state.allCards.concat(action.cards).reduce((prev, curr) => {
          for (let i = 0; i < prev.length; i++) {
            if(prev[i].id === curr.id) {
              return prev;
            }
          }
          return prev.concat([curr]);
        }, [])
      });

    case types.DELETE_CARD :
      return Object.assign({}, state, {
        allCards: state.allCards.filter(card => card.id !== action.id)
      });

    case types.UPDATE_CARD :
      return Object.assign({}, state, {
        allCards: state.allCards.filter(card => card.id !== action.card.id).concat([action.card])
      });

    case types.ADD_CARD :
      return Object.assign({}, state, {
        allCards: state.allCards.concat([action.card])
      });

    default:
      return state;
  }
};