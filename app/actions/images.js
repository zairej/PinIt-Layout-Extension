import * as types from '../constants/ActionTypes';

export function replaceImages(images) {
  return { type: types.REPLACE_IMAGES, images };
}

export function toggleImageSelection(id) {
  return { type: types.TOGGLE_IMAGE_SELECTION, id };
}
