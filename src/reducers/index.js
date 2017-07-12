/*jshint esversion: 6*/
import { combineReducers } from 'redux';
import board from './boardReducers';
import user from './userReducers';
import pop from './popReducers';

const reducers = combineReducers({
  board,
  user,
  pop
});

export default reducers;