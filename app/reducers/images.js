import * as ActionTypes from '../constants/ActionTypes';
import findIndex from 'lodash.findIndex';

const initialState = [];

// Modify an image in the state, merging in changes
// const merge = (state, id, changes) => {
//   const idx = findIndex(state, { id });
//   const target = state.slice(idx, 1);
//   return [...state.slice(0, idx), { ...target, ...changes }, ...state.slice(idx + 1)];
// };

const countSelectedImages = (images) => images.filter(img => img.isSelected).length

const actionsMap = {
  // [ActionTypes.ADD_IMAGE](state, { image }) {
  //   return [...state, image];
  // },
  [ActionTypes.REPLACE_IMAGES](state, { images }) {
    if (images.length && countSelectedImages(images) === 0) {
      images[0].isSelected = true;
    }
    return [...images];
  },
  // [ActionTypes.SELECT_IMAGE](state, { id }) {
  //   return merge(state, id, { isSelected: true });
  // },
  // [ActionTypes.DESELECT_IMAGE](state, { id }) {
  //   return merge(state, id, { isSelected: false });
  // },
  [ActionTypes.TOGGLE_IMAGE_SELECTION](state, { id }) {
    const idx = findIndex(state, { id });
    const target = state.slice(idx, idx + 1)[0];
    const selectedTarget = {
      ...target,
      isSelected: (target.isSelected === 'undefined' ? true : !target.isSelected)
    };
    const newState = [
      ...state.slice(0, idx),
      selectedTarget,
      ...state.slice(idx + 1)
    ];
    // // You always need at least one selected
    // if (countSelectedImages(newState) === 0) {
    //   return state;
    // }
    return newState;
  }
};

export default function imagesReducer(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
