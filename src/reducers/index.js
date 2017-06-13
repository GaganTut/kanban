/*jshint esversion: 6*/
import { combineReducers } from 'redux';
import board from './boardReducers';
import user from './userReducers';
import helper from './helperReducers';

const reducers = combineReducers({
  board,
  user,
  helper
});

export default reducers;