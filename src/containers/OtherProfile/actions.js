import {
  LOAD_PROFILE_DATA,
  LOAD_PROFILE_DATA_SUCCESS,
  LOAD_PROFILE_DATA_ERROR,
  RESET_OTHER_PROFILE,
} from './types';

export const loadProfileData = (id) => ({
  type: LOAD_PROFILE_DATA,
  payload: { id },
});

export const loadProfileDataSuccess = (data) => ({
  type: LOAD_PROFILE_DATA_SUCCESS,
  payload: { data },
});

export const loadProfileDataError = () => ({
  type: LOAD_PROFILE_DATA_ERROR,
});

export const resetProfileData = () => ({
  type: RESET_OTHER_PROFILE,
});
