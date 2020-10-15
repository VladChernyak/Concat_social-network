import { useDispatch, useSelector } from 'react-redux';
import { setNavigationState } from '../containers/AppPage/actions';
import { selectMenuOpen } from '../containers/AppPage/selectors';

const useNavBarToggle = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectMenuOpen);

  const toggleNavBar = () => dispatch(setNavigationState(!isOpen));

  return { toggleNavBar, isOpen };
};

export default useNavBarToggle;
