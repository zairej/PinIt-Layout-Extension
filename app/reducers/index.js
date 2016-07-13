import { combineReducers } from 'redux';
import images from './images';
import canvas from './canvas';
import isVisible from './visibility';
import isVisibleNUX from './visibilitynux';
import step from './step';
import imagesOnPage from './imagesOnPage';

export default combineReducers({
  images,
  canvas,
  isVisible,
  isVisibleNUX,
  step,
  imagesOnPage
});
