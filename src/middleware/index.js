import {getAllCards, updateCardInDb, deleteCardInDb} from '../lib/fetchFromDB';
import * as types from '../constants';

const customMiddleware = store => next => action => {
  switch (action.type) {
    case types.LOAD_CARDS:
      getAllCards()
        .then(cards => {
          action.cards = cards;
          next(action);
        })
        .catch(console.log);
      break;
    case types.DELETE_CARD:
      deleteCardInDb(action.id)
        .then(next(action))
        .catch(console.log);
      break;
    case types.UPDATE_CARD:
      updateCardInDb(action.card.id, action.card)
        .then(card => {
          action.card = card;
          next(action);
        })
        .catch(console.log);
      break;
    default:
      next(action);
  }
};

export default customMiddleware;

