import React from 'react';
import { Avatar } from '../';
import { getMessageTimeString } from '../../config/dateTime';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Message.scss';

const Message = ({ sender, text, senderName, avatarUrl, time }) => {
  const myId = localStorage.getItem('myId');
  const isUser = sender === myId;
  const classes = classNames('message', { user__message: isUser, interlocutor__message: !isUser });

  return (
    <div className={classes}>
      <div className="message__inner">
        <div className="message__sendInfo">
          {isUser ? null : <Avatar className="chat__avatar" avatarUrl={avatarUrl} />}
          <time dateTime={time}>{getMessageTimeString(time)}</time>
        </div>
        <div className="message__content">
          {isUser ? null : <div className="message__sender">{senderName}</div>}
          <p className="message__text">{text}</p>
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  sender: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  senderName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  time: PropTypes.number.isRequired,
};

export default Message;
