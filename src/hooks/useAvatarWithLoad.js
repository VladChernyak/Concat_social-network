import { useDispatch, useSelector } from 'react-redux';
import { compressImage } from '../config/dataHandlers';
import { uploadAvatar } from '../containers/UserProfile/actions';
import { selectUserProfile } from '../containers/UserProfile/selectors';

const useAvatarWithLoad = () => {
  const dispatch = useDispatch();
  const { avatarUpload, avatarUrl } = useSelector(selectUserProfile);

  const loadAvatar = ({ target }) => {
    const handler = (file) => dispatch(uploadAvatar(file));

    compressImage(target, 600, handler);
  };

  return {
    avatarUpload,
    avatarUrl,
    loadAvatar,
  };
};

export default useAvatarWithLoad;
