import {
  LOAD_PROFILE_DATA,
  LOAD_PROFILE_DATA_ERROR,
  LOAD_PROFILE_DATA_SUCCESS,
  RESET_OTHER_PROFILE,
} from './types';

const initialState = {
  name: '',
  surname: '',
  posts: {},
  loading: true,
  error: false,
};

const otherProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROFILE_DATA:
      return { ...state, loading: true, error: false };
    case LOAD_PROFILE_DATA_SUCCESS:
      return { ...state, loading: false, ...action.payload.data };
    case LOAD_PROFILE_DATA_ERROR:
      return { ...state, loading: false, error: true };
    case RESET_OTHER_PROFILE:
      return { ...state, name: '', surname: '', posts: [], loading: true, error: false };
    default:
      return state;
  }
};

export default otherProfileReducer;
