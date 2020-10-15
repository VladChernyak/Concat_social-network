import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarWithLoad, DefaultButton, Blog } from '../';
import { CHAT } from '../../constants/pathnames';
import PropTypes from 'prop-types';
import './Profile.scss';

const Profile = ({ name, surname, avatarUrl, userId, posts }) => (
  <section className="profile">
    <div className="profile__info">
      {userId ? (
        <Avatar avatarUrl={avatarUrl} className="profile__photo" />
      ) : (
        <AvatarWithLoad className="profile__photo" />
      )}
      <h1 className="profile__name">{name + ' ' + surname}</h1>
      {userId && (
        <Link to={CHAT + '/' + userId}>
          <DefaultButton text="Написать сообщение" />
        </Link>
      )}
    </div>
    <Blog
      avatarUrl={avatarUrl}
      posts={posts}
      name={name}
      surname={surname}
      noAdd={!!userId}
      userId={userId}
    />
  </section>
);

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  userId: PropTypes.string,
  posts: PropTypes.objectOf(
    PropTypes.shape({
      text: PropTypes.string,
      imageUrl: PropTypes.string,
      time: PropTypes.string.isRequired,
      likes: PropTypes.objectOf(PropTypes.string),
    }),
  ),
};

export default Profile;
