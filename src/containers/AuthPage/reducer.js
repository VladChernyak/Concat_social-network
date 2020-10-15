import {
  LOG_IN,
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  REGISTRATION_RESET,
  LOG_IN_ERROR,
  LOG_IN_RESET,
  LOG_IN_SUCCESS,
  AUTO_LOGIN_ERROR,
  AUTO_LOGIN_SUCCESSFUL,
  LOGOUT,
} from './types';

const initialState = {
  inProcess: false,
  isLoggedIn: false,
  autoLoginDone: false,
  loggedInError: false,
  registerError: false,
  registerSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
    case REGISTRATION:
      return { ...state, inProcess: true };
    case AUTO_LOGIN_SUCCESSFUL:
      return { ...state, autoLoginDone: true, isLoggedIn: true };
    case AUTO_LOGIN_ERROR:
      return { ...state, autoLoginDone: true };
    case LOG_IN_SUCCESS:
      return { ...state, isLoggedIn: true, inProcess: false };
    case LOG_IN_ERROR:
      return { ...state, loggedInError: true, inProcess: false };
    case LOG_IN_RESET:
      return { ...state, loggedInError: false };
    case REGISTRATION_SUCCESS:
      return { ...state, registerSuccess: true, inProcess: false };
    case REGISTRATION_ERROR:
      return { ...state, registerError: true, inProcess: false };
    case REGISTRATION_RESET:
      return { ...state, registerError: false, inProcess: false, registerSuccess: false };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};
