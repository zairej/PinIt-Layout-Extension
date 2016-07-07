import * as ActionTypes from '../constants/ActionTypes';

const initialState = 1;

const actionsMap = {
  [ActionTypes.NEXT_STEP](state, { step }) {
    return step + 1;
  },
  [ActionTypes.PREVIOUS_STEP](state, { step }) {
    return step - 1;
  },
  [ActionTypes.RESET_STEP]({ step }) {
    return 1;
  }
};

export default function stepReducer(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}