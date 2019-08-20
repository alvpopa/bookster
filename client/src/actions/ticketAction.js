import { ADD_EVENT, REMOVE_EVENT, REMOVE_ALL_EVENTS } from './types';

import { setAlert } from './alertAction';

export const addEvent = ({
  eventId,
  homeTeam,
  awayTeam,
  odd,
  prediction,
}) => dispatch => {
  // REMOVE EVENT IF ANY
  dispatch({ type: REMOVE_EVENT, payload: eventId });

  // SET EVENT
  dispatch({
    type: ADD_EVENT,
    payload: {
      eventId,
      homeTeam,
      awayTeam,
      odd: Number(odd),
      prediction,
    },
  });
};

export const removeEvent = eventId => dispatch => {
  dispatch({ type: REMOVE_EVENT, payload: eventId });
  dispatch(setAlert(`Event ${eventId} removed`, 200, 'success'));
};

export const removeAllEvents = () => dispatch => {
  dispatch({ type: REMOVE_ALL_EVENTS });
  dispatch(setAlert('All events removed', 200, 'success'));
};
