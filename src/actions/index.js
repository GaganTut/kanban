/*jshint esversion :6*/
import * as types from '../constants';

export const loadCards = () => ({type: types.LOAD_CARDS});
export const deleteCard = id => ({type: types.DELETE_CARD,id});
export const updateCard = card => ({type: types.UPDATE_CARD,card});
export const login = (username, password) => ({type: types.LOG_IN, userInfo: {username, password}});
export const logout = username => ({type: types.LOG_OUT, username});