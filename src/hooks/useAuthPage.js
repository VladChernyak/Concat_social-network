import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { autoLogin } from '../containers/AuthPage/actions';
import { selectAuth } from '../containers/AuthPage/selectors';

const useAuthPage = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, autoLoginDone } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return {
    isLoggedIn,
    autoLoginDone,
  };
};

export default useAuthPage;
