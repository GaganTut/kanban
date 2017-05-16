/*jshint esversion: 6*/
import * as db from '../lib/fetchFromDB';
import * as types from '../constants';

const customMiddleware = store => next => action => {
  switch (action.type) {
    case types.LOAD_CARDS:
      next({type: types.FETCHING_IN_PROGRESS});
      db.getAllCards()
        .then(cards => {
          action.cards = cards;
          next(action);
        })
        .catch(console.log);
      break;

    case types.DELETE_CARD:
      next({type: types.FETCHING_IN_PROGRESS});
      db.deleteCard(action.id)
        .then(next(action))
        .catch(console.log);
      break;

    case types.UPDATE_CARD:
      next({type: types.FETCHING_IN_PROGRESS});
      db.updateCard(action.card.id, action.card)
        .then(card => {
          action.card = card;
          next(action);
        })
        .catch(console.log);
      break;

    case types.ADD_CARD:
      next({type: types.FETCHING_IN_PROGRESS});
      db.addCard(action.card)
        .then(card => {
          action.card = card;
          next(action);
        })
        .catch(console.log);
        break;

    case types.LOG_IN:
      next({type: types.FETCHING_IN_PROGRESS});
      db.loginUser(action.userInfo.username, action.userInfo.password)
        .then(user => {
          localStorage.setItem('loggedIn', true);
          localStorage.setItem('username', user.username);
          localStorage.setItem('firstname', user.firstname);
          localStorage.setItem('lastname', user.lastname);
          action.user = user;
          next(action);
        })
      .catch(console.log);
      break;
    case types.LOG_OUT:
      console.log(action);
      next({type: types.FETCHING_IN_PROGRESS});
      db.logoutUser()
        .then((success) => {
          console.log(success);
          localStorage.clear();
          next(action);
        })
        .catch(console.log);
      break;
    default:
      next(action);
  }
};

export default customMiddleware;

