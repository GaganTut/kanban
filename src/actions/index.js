/*jshint esversion :6*/
import * as types from '../constants';
import * as db from '../lib/fetchFromDB';

export const login = (username, password) => {
  return dispatch => {
    dispatch({type: types.FETCHING_IN_PROGRESS});
    return db.loginUser(username, password)
      .then(user => {
        dispatch({type: types.FETCHING_DONE});
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', user.username);
        dispatch({type: types.LOG_IN, user});
      })
      .catch(console.log);
  };
};

export const logout= username => {
  return dispatch => {
    dispatch({type: types.FETCHING_IN_PROGRESS});
    db.logoutUser()
      .then(() => {
        localStorage.clear();
        dispatch({type: types.FETCHING_DONE});
        dispatch({type: types.LOG_OUT, username});
      })
      .catch(console.log);
  };
};

export const loadUserList = () => {
  return dispatch => {
    return db.getUserList()
      .then(users => {
        dispatch({
          type: types.LOAD_USER_LIST,
          users
        });
      })
      .catch(console.log);
  };
};

export const loadCards = () => {
  return dispatch => {
    dispatch({type: types.FETCHING_IN_PROGRESS});
    return db.getAllCards()
      .then(cards => {
        dispatch({type: types.FETCHING_DONE});
        dispatch({
          type: types.LOAD_CARDS,
          cards
        });
      })
      .catch(console.log);
  };
};

export const deleteCard = id => {
  return dispatch => {
    dispatch({type: types.FETCHING_IN_PROGRESS});
    return db.deleteCard(id)
      .then(() => {
        dispatch({type: types.FETCHING_DONE});
        dispatch({type: types.DELETE_CARD, id});
      })
      .catch(console.log);
  };
};

export const updateCard=  card => {
  return dispatch => {
    dispatch({type: types.FETCHING_IN_PROGRESS});
    return db.updateCard(card.id, card)
      .then(card => {
        dispatch({type: types.FETCHING_DONE});
        dispatch({type: types.UPDATE_CARD, card});
      })
      .catch(console.log);
  };
};

export const addCard = card => {
  return dispatch => {
    dispatch({type: types.FETCHING_IN_PROGRESS});
    return db.addCard(card)
      .then(card => {
        dispatch({type: types.FETCHING_DONE});
        dispatch({type: types.ADD_CARD, card});
      })
      .catch(console.log);
  };
};