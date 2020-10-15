import {
  SHOW_POPUP,
  CLOSE_POPUP,
  UPDATE_AVATAR_LOADING,
  GET_USER_PROFILE_DATA,
  GET_USER_PROFILE_DATA_SUCCESS,
  GET_USER_PROFILE_DATA_ERROR,
} from './types';

export const initialState = {
  name: '',
  surname: '',
  posts: {},
  avatarUrl: '',
  loading: true,
  error: false,
  avatarUpload: null,
  removePostData: {},
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_DATA:
      return { ...state, error: false, loading: true };
    case GET_USER_PROFILE_DATA_SUCCESS:
      return { ...state, ...action.payload.data, loading: false };
    case GET_USER_PROFILE_DATA_ERROR:
      return { ...state, loading: false, error: true };
    case SHOW_POPUP:
      return { ...state, removePostData: { ...action.payload } };
    case CLOSE_POPUP:
      return { ...state, removePostData: {} };
    case UPDATE_AVATAR_LOADING:
      return { ...state, avatarUpload: action.payload.value };
    default:
      return state;
  }
};

export default userProfileReducer;
