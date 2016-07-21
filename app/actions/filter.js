import * as types from '../constants/ActionTypes';

export function setFilter(filter) {
  return { type: types.SET_FILTER, filter };
}
