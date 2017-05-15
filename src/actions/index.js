/*jshint esversion :6*/
import * as types from '../constants';

export const loadCards = () => ({type: types.LOAD_CARDS});
export const deleteCard = id => ({type: types.DELETE_CARD,id});
export const updateCard = card => ({type: types.UPDATE_CARD,card});