import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setNavigationState } from '../containers/AppPage/actions';
import { selectMenuOpen } from '../containers/AppPage/selectors';
import { AUTH } from '../constants/pathnames';

const useNavBarToggle = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isOpen = useSelector(selectMenuOpen);
  const isHidden = pathname.includes(AUTH);

  const toggleNavBar = () => dispatch(setNavigationState(!isOpen));

  return { toggleNavBar, isOpen, isHidden };
};

export default useNavBarToggle;
