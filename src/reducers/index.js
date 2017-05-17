/*jshint esversion: 6*/
import { combineReducers } from 'redux';
import board from './boardReducers';
import user from './userReducers';

const reducers = combineReducers({
  board,
  user
});

export default reducers;