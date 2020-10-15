import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setNavigationState } from '../containers/AppPage/actions';
import { selectMenuOpen } from '../containers/AppPage/selectors';
import { logout } from '../containers/AuthPage/actions';
import { selectNewMessages } from '../containers/Chat/selectors';

const useNavBar = () => {
  const newMessages = useSelector(selectNewMessages);
  const menuOpen = useSelector(selectMenuOpen);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNavigationState(false));
  }, [pathname, dispatch]);

  const logOut = () => dispatch(logout());

  return {
    newMessages,
    menuOpen,
    logOut,
  };
};

export default useNavBar;
