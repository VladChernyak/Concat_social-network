import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList } from '../containers/Social/actions';
import { selectSocial } from '../containers/Social/selectors';

const useSocial = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(selectSocial);

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  let users = Object.entries(list);

  const [searchValue, setSearchValue] = useState('');

  if (searchValue) {
    users = users.filter(([id, value]) => {
      const val = searchValue.trim().toLowerCase();

      return value.name.toLowerCase().includes(val) || value.surname.toLowerCase().includes(val);
    });
  }

  return {
    users,
    loading,
    error,
    searchValue,
    setSearchValue,
  };
};

export default useSocial;
