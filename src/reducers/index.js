import { combineReducers } from 'redux';
import mines from './mines';
import board from './board';
import isGameOver from './isGameOver';
import isWinner from './isWinner';

export default combineReducers({
  mines,
  board,
  isGameOver,
  isWinner
});