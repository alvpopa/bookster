import axios from 'axios';

import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
} from './types';

import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alertAction';

// SERVER URL
const uri = 'http://localhost:5000';

// SET HEADERS
const config = {
  header: {
    'Content-Type': 'application/json',
  },
};

// LOAD USER FROM LOCAL STORAGE
export const loadUser = () => async dispatch => {
  // CHECK TOKEN ON LOCAL STORAGE AND SET AUTH HEADER
  const { token } = localStorage;
  if (token) {
    setAuthToken(token);
  } else {
    return;
  }

  // DISPATCH USER LOADING
  dispatch({ type: USER_LOADING });

  try {
    const {
      data: { user: payload },
    } = await axios.get(`${uri}/api/auth/user`, config);

    // DISPATCH USER LOADED
    dispatch({ type: USER_LOADED, payload });
  } catch (error) {
    // DISPATCH AUTH ERROR
    dispatch({ type: AUTH_ERROR });
  }
};

// REGISTER USER
export const registerUser = ({
  name,
  username,
  email,
  password,
  cPassword,
}) => async dispatch => {
  const body = { name, username, email, password, cPassword };

  try {
    const { data } = await axios.post(`${uri}/api/user/signup`, body, config);

    // DISPATCH REGISTER SUCCESS
    dispatch({ type: REGISTER_SUCCESS, payload: data });

    // DISPATCH SET ALERT ACTION
    dispatch(setAlert('Logged In', 201, 'success'));
  } catch (error) {
    const { data, status } = error.response;

    // DISPATCH REGISTER FAIL
    dispatch({ type: REGISTER_FAIL });

    // DISPATCH SET ALERT ACTION
    dispatch(setAlert(data, status, 'danger'));
  }
};

// LOGIN USER
export const loginUser = body => async dispatch => {
  try {
    const { data: payload } = await axios.post(`${uri}/api/auth`, body, config);

    // DISPATCH LOGIN SUCCESS
    dispatch({
      type: LOGIN_SUCCESS,
      payload,
    });

    // DISPATCH SET ALERT ACTION
    dispatch(setAlert('Logged In!', 200, 'success'));
  } catch (error) {
    const { data, status } = error.response;

    // DISPATCH LOGIN FAIL
    dispatch({
      type: LOGIN_FAIL,
    });

    // DISPATCH SET ALERT ACTION
    dispatch(setAlert(data, status, 'danger'));
  }
};

// LOGOUT USER
export const logoutUser = () => async dispatch => {
  // SET LOGOUT
  dispatch({ type: LOGOUT });

  // DISPATCH SET ALERT ACTION
  dispatch(setAlert('Logged Out', 200, 'success'));
};
