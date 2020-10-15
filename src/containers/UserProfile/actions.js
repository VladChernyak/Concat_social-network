import {
  SHOW_POPUP,
  CLOSE_POPUP,
  UPDATE_AVATAR_LOADING,
  GET_USER_PROFILE_DATA_SUCCESS,
  GET_USER_PROFILE_DATA_ERROR,
  GET_USER_PROFILE_DATA,
  ADD_POST,
  REMOVE_POST,
  TOGGLE_LIKE,
  UPLOAD_AVATAR,
} from './types';

export const loadProfileData = () => ({
  type: GET_USER_PROFILE_DATA,
});

export const loadProfileDataSuccess = (data) => ({
  type: GET_USER_PROFILE_DATA_SUCCESS,
  payload: { data },
});

export const loadProfileDataError = () => ({
  type: GET_USER_PROFILE_DATA_ERROR,
});

export const addPost = (postData, image) => ({
  type: ADD_POST,
  payload: { postData, image },
});

export const removePostById = ({ postId, withImage }) => ({
  type: REMOVE_POST,
  payload: { postId, withImage },
});

export const closeRemovePostPopUp = () => ({
  type: CLOSE_POPUP,
});

export const toggleLike = (userId, postId) => ({
  type: TOGGLE_LIKE,
  payload: { userId, postId },
});

export const showRemovePostPopUp = (postId, withImage) => {
  return {
    type: SHOW_POPUP,
    payload: { postId, withImage },
  };
};

export const uploadAvatar = (image) => ({
  type: UPLOAD_AVATAR,
  payload: { image },
});

export const updateAvatarLoading = (value) => ({
  type: UPDATE_AVATAR_LOADING,
  payload: { value },
});

