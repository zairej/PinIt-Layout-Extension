import * as ActionTypes from '../constants/ActionTypes';
import findIndex from 'lodash.findIndex';

const initialState = [];

// Modify an image in the state, merging in changes
const merge = (state, id, changes) => {
  const idx = findIndex(state, { id });
  const target = state.slice(idx, 1);
  return [...state.slice(0, idx), { ...target, ...changes }, ...state.slice(idx + 1)];
};

const actionsMap = {
  [ActionTypes.ADD_IMAGE](state, { image }) {
    return [...state, image];
  },
  [ActionTypes.REMOVE_IMAGE](state, { id }) {
    const newState = [...state];
    const i = findIndex(newState, { id });
    if (i !== -1) {
      newState.splice(i, 1);
    }
    return newState;
  },
  [ActionTypes.POSITION_IMAGE](state, { id, position }) {
    return merge(state, id, position);
  },
  [ActionTypes.REMOVE_ALL_CANVAS_IMAGES]() {
    return [];
  },
};

export default function canvasReducer(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
