import { GET_USERS_LIST, GET_USERS_LIST_ERROR, GET_USERS_LIST_SUCCESS } from './types';

export const getUsersList = () => ({
  type: GET_USERS_LIST,
});

export const getUsersListSuccess = (data) => ({
  type: GET_USERS_LIST_SUCCESS,
  payload: { data },
});

export const getUsersListError = () => ({
  type: GET_USERS_LIST_ERROR,
});
