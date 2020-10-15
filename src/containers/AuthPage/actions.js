import {
  LOG_IN,
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  REGISTRATION_RESET,
  LOG_IN_RESET,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  AUTO_LOGIN,
  AUTO_LOGIN_SUCCESSFUL,
  AUTO_LOGIN_ERROR,
  LOGOUT,
} from './types';

export const logIn = ({ email, password }) => ({
  type: LOG_IN,
  payload: { email, password },
});

export const logInSuccess = () => ({
  type: LOG_IN_SUCCESS,
});

export const logInError = () => ({
  type: LOG_IN_ERROR,
});

export const registration = ({ email, password, name, surname }) => ({
  type: REGISTRATION,
  payload: { email, password, name, surname },
});

export const registrationSuccess = () => ({
  type: REGISTRATION_SUCCESS,
});

export const registrationError = () => ({
  type: REGISTRATION_ERROR,
});

export const autoLogin = () => ({
  type: AUTO_LOGIN,
});

export const autoLoginSuccess = () => ({
  type: AUTO_LOGIN_SUCCESSFUL,
});

export const autoLoginError = () => ({
  type: AUTO_LOGIN_ERROR,
});

export const logout = () => ({
  type: LOGOUT,
});

export const resetLogIn = () => ({
  type: LOG_IN_RESET,
});

export const resetRegistration = () => ({
  type: REGISTRATION_RESET,
});
