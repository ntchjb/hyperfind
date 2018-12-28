import { SESSION_SET_ACTIVE, HYPERFIND_SET_ACTIVE_SESSION } from './constants';

export const setActiveSession = uid => (dispatch) => {
  dispatch({
    type: SESSION_SET_ACTIVE,
    uid,
  });
};

export const setSessionUidAtInput = uid => (dispatch) => {
  dispatch({
    type: HYPERFIND_SET_ACTIVE_SESSION,
    uid,
  });
};
