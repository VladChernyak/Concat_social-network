import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../containers/AuthPage/selectors';
import { loadDialogs } from '../containers/Chat/actions';

const useAppPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    isLoggedIn && dispatch(loadDialogs());
  }, [dispatch, isLoggedIn]);

  return { isLoggedIn };
};

export default useAppPage;
