import { useDispatch, useSelector } from 'react-redux';
import { selectUserProfile } from '../containers/UserProfile/selectors';
import {
  closeRemovePostPopUp,
  loadProfileData,
  removePostById,
} from '../containers/UserProfile/actions';
import { useEffect } from 'react';

const useUserProfile = () => {
  const dispatch = useDispatch();
  const {
    name,
    surname,
    posts,
    avatarUrl,
    loading,
    error,
    avatarUpload,
    removePostData,
  } = useSelector(selectUserProfile);

  const removePost = () => dispatch(removePostById(removePostData));
  const closePopUp = () => dispatch(closeRemovePostPopUp());

  useEffect(() => {
    dispatch(loadProfileData());
  }, [dispatch]);

  return {
    name,
    surname,
    posts,
    avatarUrl,
    loading,
    error,
    avatarUpload,
    removePostData,
    removePost,
    closePopUp,
  };
};

export default useUserProfile;
