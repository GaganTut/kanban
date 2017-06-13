/*jshint esversion :6*/
import * as types from '../constants';
import * as API from '../lib/API_CALLS';

export const login = (username, password) => dispatch => {
  dispatch({type: types.FETCHING_IN_PROGRESS});
  return API.loginUser(username, password)
  .then(res => {
    dispatch({type: types.FETCHING_DONE});
    if (res.success) {
      dispatch(loadBoards());
      dispatch({type: types.LOG_IN, user: res.user});
    } else {
      dispatch({type: types.THROW_ERROR, error: 'Login Failed'});
    }
  });
};

export const logout= username => dispatch => {
  dispatch({type: types.FETCHING_IN_PROGRESS});
  API.logoutUser()
  .then(() => {
    dispatch({type: types.FETCHING_DONE});
    dispatch({type: types.LOG_OUT});
  });
};

export const signup = userInfo => dispatch => {
  dispatch({type: types.FETCHING_IN_PROGRESS});
  API.signupUser(userInfo)
    .then(res => {
      dispatch({type: types.FETCHING_DONE});
      if (res.success) {
        dispatch(login(userInfo.username, userInfo.password));
      } else {
        dispatch({type: types.THROW_ERROR, error: 'Sign Up Failed'});
      }
    });
};

export const loadCards = (boardId) => dispatch => {
  dispatch({type: types.FETCHING_IN_PROGRESS});
  return API.loadCards(boardId)
  .then(res => {
    dispatch({type: types.FETCHING_DONE});
    if (res.success) {
      dispatch({type: types.LOAD_CARDS, boardId, cards: res.cards});
    }
  });
};

export const deleteCard = id => dispatch => {
  dispatch({type: types.FETCHING_IN_PROGRESS});
  return API.deleteCard(id)
    .then(res => {
      dispatch({type: types.FETCHING_DONE});
      if (res.success) {
        dispatch({type: types.DELETE_CARD, id});
      } else {
        dispatch({type: types.THROW_ERROR, error: check.failed});
      }
    });
};

export const updateCard = card => dispatch => {
  dispatch({type: types.FETCHING_IN_PROGRESS});
  return API.updateCard(card.id, card)
    .then(res => {
      dispatch({type: types.FETCHING_DONE});
      if (res.success) {
        dispatch({type: types.UPDATE_CARD, card});
      } else {
        dispatch({type: types.THROW_ERROR, error: card.failed});
      }
    });
};

export const addCard = card => {
  return dispatch => {
    dispatch({type: types.FETCHING_IN_PROGRESS});
    return API.addCard(card)
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

export const closeError = () => dispatch => dispatch({type: types.CLOSE_ERROR});

export const loadApp = () => dispatch => {
  return API.checkLogin()
  .then(res => {
    if (res.success) {
      dispatch(loadBoards());
      return dispatch({type: types.LOGIN, user: res.user});
    }
  });
};

export const loadBoards = () => dispatch => {
  return API.loadBoards()
  .then(res => {
    if (res.success) {
      dispatch({type: types.LOAD_BOARDS, boards: res.boards});
    }
  });
};