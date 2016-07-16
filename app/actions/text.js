import * as types from '../constants/ActionTypes';

export function updateString(string) {
  return { type: types.UPDATE_STRING, string };
}

export function updateX(x) {
  return { type: types.UPDATE_X, x };
}

export function updateY(y) {
  return { type: types.UPDATE_Y, y };
}

export function updateSize(size) {
  return { type: types.UPDATE_SIZE, size };
}

export function updateFont(font) {
  return { type: types.UPDATE_FONT, font };
}

export function updateColor(color) {
  return { type: types.UPDATE_COLOR, color };
}

export function resetText() {
	return { type: types.RESET_TEXT };
}
