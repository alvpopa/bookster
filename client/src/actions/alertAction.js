import uuid from 'uuid';

import { REMOVE_ALERT, SET_ALERT } from './types';

export const setAlert = (
  msg,
  status,
  alertType,
  timeout = 3000
) => dispatch => {
  const id = uuid.v4();

  // SET ALERT
  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      msg,
      status,
      alertType,
    },
  });

  // REMOVE ALERT
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
