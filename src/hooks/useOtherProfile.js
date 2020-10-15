import { useDispatch, useSelector } from 'react-redux';
import { selectOtherProfile } from '../containers/OtherProfile/selectors';
import { loadProfileData, resetProfileData } from '../containers/OtherProfile/actions';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const useOtherProfile = () => {
  const dispatch = useDispatch();
  const { name, surname, posts, avatarUrl, loading, error } = useSelector(selectOtherProfile);
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadProfileData(id));

    return () => dispatch(resetProfileData(id));
  }, [dispatch, id]);

  return {
    name,
    surname,
    posts,
    avatarUrl,
    loading,
    error,
    id,
  };
};

export default useOtherProfile;
