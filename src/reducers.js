import { HYPERFIND_SET_ACTIVE_SESSION, SESSION_SET_ACTIVE } from './constants';

export default (state, action) => {
  let newState = state;
  switch (action.type) {
    case HYPERFIND_SET_ACTIVE_SESSION: {
      newState = newState.set('hyperfindActiveSessionUid', action.uid);
      break;
    }
    case SESSION_SET_ACTIVE: {
      newState = newState.set('hyperfindActiveSessionUid', action.uid);
      break;
    }
    default: {
      return state;
    }
  }
  return newState;
};
