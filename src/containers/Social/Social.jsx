import React from 'react';
import { SocialListUser, Loader, ErrorMessage } from '../../components';
import { useSocial } from '../../hooks';
import './Social.scss';

const Social = () => {
  const { users, loading, error, searchValue, setSearchValue } = useSocial();

  if (error) return <ErrorMessage />;

  return (
    <div className="social">
      <h1>Список пользователей</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <input
            type="text"
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
            className="social__search"
            placeholder="Поиск"
          />
          <ul className="social__list">
            {users.map(([key, value]) => (
              <SocialListUser
                name={value.name}
                surname={value.surname}
                avatarUrl={value.avatarUrl}
                id={key}
                key={key}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Social;
