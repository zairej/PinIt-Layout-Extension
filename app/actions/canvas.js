import * as types from '../constants/ActionTypes';

export function addImage(image) {
  return { type: types.ADD_IMAGE, image };
}

export function removeImage(id) {
  return { type: types.REMOVE_IMAGE, id };
}

export function positionImage({ id, position }) {
  return { type: types.POSITION_IMAGE, payload: { id, position } };
}

