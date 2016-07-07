import { combineReducers } from 'redux';
import images from './images';
import canvas from './canvas';
import isVisible from './visibility';
import step from './step';

export default combineReducers({
  images,
  canvas,
  isVisible,
  step,
});
