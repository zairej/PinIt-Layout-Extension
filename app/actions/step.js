import * as types from '../constants/ActionTypes';

export function nextStep(step) {
  return { type: types.NEXT_STEP, step };
}

export function previousStep(step) {
  return { type: types.PREVIOUS_STEP, step };
}

export function resetStep() {
	return { type: types.RESET_STEP };
}
