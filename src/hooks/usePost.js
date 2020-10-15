import { useDispatch } from 'react-redux';
import { toggleLike, showRemovePostPopUp } from '../containers/UserProfile/actions';
import classNames from 'classnames';

const usePost = (postId, userId, likes) => {
  const dispatch = useDispatch();
  const myId = localStorage.getItem('myId');

  const likeUsers = likes ? Object.values(likes) : [];
  const likesClasses = classNames('post__like', { active: likeUsers.includes(myId) });

  const showPopUp = (postId, withImage) => dispatch(showRemovePostPopUp(postId, withImage));
  const setLike = () => {
    const id = userId || myId;

    dispatch(toggleLike(id, postId));
  };

  return {
    likeUsers,
    showPopUp,
    setLike,
    likesClasses,
  };
};

export default usePost;
