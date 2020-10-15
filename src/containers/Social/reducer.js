import { GET_USERS_LIST, GET_USERS_LIST_ERROR, GET_USERS_LIST_SUCCESS } from './types';

const initialState = {
  list: {},
  loading: true,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_LIST: 
      return { ...state, error: false, loading: true };
    case GET_USERS_LIST_SUCCESS:
      return { ...state, list: action.payload.data, loading: false };
    case GET_USERS_LIST_ERROR:
      return { ...state, error: true, loading: false }
    default:
      return state;
  }
};
