import { combineReducers } from 'redux';

import alerts from './alertReducer';
import auth from './authReducer';
import tickets from './ticketReducer';

export default combineReducers({
  alerts,
  auth,
  tickets,
});
