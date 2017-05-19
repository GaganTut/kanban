/*jshint esversion :6*/
import * as types from '../constants';
import * as db from '../lib/fetchFromDB';

export const login = (username, password) => {
  return dispatch => {
    dispatch({type: types.FETCHING_IN_PROGRESS});
    return db.loginUser(username, password)
      .then(user => {
        dispatch({type: types.FETCHING_DONE});
        if (typeof user === 'object' && user.hasOwnProperty('username')) {
          localStorage.setItem('loggedIn', true);
          localStorage.setItem('username', user.username);
          dispatch({type: types.LOG_IN, user});
        } else {
          dispatch({type: types.THROW_ERROR, error: 'Login Failed'});
        }
      })
      .catch(err => {console.log(err);});
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
      });
  };
};

export const signup = userInfo => {
  return dispatch => {
    dispatch({type: types.FETCHING_IN_PROGRESS});
    db.signupUser(userInfo)
      .then(user => {
        dispatch({type: types.FETCHING_DONE});
        db.loginUser(userInfo.username, userInfo.password)
          .then(user => {
            dispatch({type: types.FETCHING_DONE});
            if (typeof user === 'object' && user.hasOwnProperty('username')) {
              localStorage.setItem('loggedIn', true);
              localStorage.setItem('username', user.username);
              dispatch({type: types.LOG_IN, user});
            } else {
              dispatch({type: types.THROW_ERROR, error: 'Login Failed'});
            }
          })
          .catch(err => {console.log(err);});
      });
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
      });
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
      });
  };
};

export const deleteCard = id => {
  return dispatch => {
    dispatch({type: types.FETCHING_IN_PROGRESS});
    return db.deleteCard(id)
      .then(check => {
        dispatch({type: types.FETCHING_DONE});
        if (check.hasOwnProperty('failed')) {
          dispatch({type: types.THROW_ERROR, error: check.failed});
        } else {
          dispatch({type: types.DELETE_CARD, id});
        }
      });
  };
};

export const updateCard = card => {
  return dispatch => {
    dispatch({type: types.FETCHING_IN_PROGRESS});
    return db.updateCard(card.id, card)
      .then(card => {
        dispatch({type: types.FETCHING_DONE});
        if (card.hasOwnProperty('failed')) {
          dispatch({type: types.THROW_ERROR, error: card.failed});
        } else {
          dispatch({type: types.UPDATE_CARD, card});
        }
      });
  };
};

export const addCard = card => {
  return dispatch => {
    dispatch({type: types.FETCHING_IN_PROGRESS});
    return db.addCard(card)
      .then(card => {
        dispatch({type: types.FETCHING_DONE});
        if (card.hasOwnProperty('failed')) {
          dispatch({type: types.THROW_ERROR, error: card.failed});
        } else {
          dispatch({type: types.ADD_CARD, card});
        }
      });
  };
};

export const closeError = () => {
  return dispatch => {
    dispatch({type: types.CLOSE_ERROR});
  };
};