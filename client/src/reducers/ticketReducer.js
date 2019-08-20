import { ADD_EVENT, REMOVE_EVENT, REMOVE_ALL_EVENTS } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_EVENT:
      return [...state, payload];

    case REMOVE_EVENT:
      return state.filter(({ eventId }) => eventId !== payload);

    case REMOVE_ALL_EVENTS:
      return initialState;

    default:
      return state;
  }
};
