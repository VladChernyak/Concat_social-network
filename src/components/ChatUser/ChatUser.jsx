import React from 'react';
import { Avatar, Indicator } from '../';
import { ChevronIcon } from '../icons';
import { Link } from 'react-router-dom';
import { getLastMessageTimeString } from '../../config/dateTime';
import { toShortenText } from '../../config/dataHandlers';
import { CHAT } from '../../constants/pathnames';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './ChatUser.scss';

const ChatUser = ({
  name,
  surname,
  avatarUrl,
  active,
  lastMessage,
  id,
  newMessages,
  openDialog,
}) => {
  const classes = classNames('chat__user', { active });

  return (
    <li className={classes}>
      <Link to={CHAT + '/' + id} onClick={() => openDialog()}>
        <div className="chat__avatar-wrapper">
          <Avatar className="chat__avatar" avatarUrl={avatarUrl} />
          <Indicator className="chat__user-indicator" value={newMessages} />
        </div>
        <div className="chat__userInfo">
          <h3 className="user-name">{name + ' ' + surname}</h3>
          <div className="last-message">
            {lastMessage ? toShortenText(lastMessage.text, 25) : 'Нет сообщений'}
          </div>
        </div>
        <time className="chat__messageDate" dateTime="2020-07-28">
          {lastMessage ? getLastMessageTimeString(lastMessage.time) : null}
        </time>
        <span className="icon-arrow">
          <ChevronIcon />
        </span>
      </Link>
    </li>
  );
};

ChatUser.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  lastMessage: PropTypes.shape({
    sender: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
  }),
  active: PropTypes.bool,
  newMessages: PropTypes.number,
  avatarUrl: PropTypes.string,
  openDialog: PropTypes.func.isRequired,
};

export default ChatUser;
