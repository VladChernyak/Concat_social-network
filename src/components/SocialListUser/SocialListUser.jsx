import React from 'react';
import { Avatar, RoundButton } from '../';
import { EnvelopeRegularIcon, UserInCircleIcon } from '../icons';
import { Link } from 'react-router-dom';
import { CHAT, HOME, OTHER_PROFILE } from '../../constants/pathnames';
import PropTypes from 'prop-types';
import './SocialListUser.scss';

const SocialListUser = ({ avatarUrl, name, surname, id }) => {
  const myId = localStorage.getItem('myId');

  return (
    <li className="user">
      <Avatar avatarUrl={avatarUrl} />
      <h3>{name + ' ' + surname}</h3>
      <div className="user__actions">
        <Link to={CHAT + '/' + id}>
          <RoundButton className="messageButton">
            <EnvelopeRegularIcon />
          </RoundButton>
        </Link>
        <Link to={myId === id ? HOME : OTHER_PROFILE + id}>
          <RoundButton className="profileButton">
            <UserInCircleIcon />
          </RoundButton>
        </Link>
      </div>
    </li>
  );
};

SocialListUser.propTypes = {
  avatarUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default SocialListUser;
