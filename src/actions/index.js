/*jshint esversion :6*/
import * as types from '../constants';

export const loadCards = cards => {
  return {
    type: types.LOAD_CARDS,
    cards
  };
};

export const deleteCard = id => {
  return {
    type: types.DELETE_CARD,
    id
  };
};

export const updateCard = card => {
  return {
    type: types.UPDATE_CARD,
    card
  };
};