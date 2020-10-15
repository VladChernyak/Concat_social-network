import React from 'react';
import { ChatUser } from '../';
import PropTypes from 'prop-types';
import './ChatUsersList.scss';

const ChatUsersList = ({ dialogs, currentId, openDialog }) => (
  <ul className="chat__users">
    {dialogs.length ? (
      dialogs.map((data) => (
        <ChatUser key={data.id} {...data} active={data.id === currentId} openDialog={openDialog} />
      ))
    ) : (
      <span className="chat__no-dialogs">Нет диалогов</span>
    )}
  </ul>
);

ChatUsersList.propTypes = {
  dialogs: PropTypes.arrayOf(
    PropTypes.shape({
      avatarUrl: PropTypes.string,
      chatId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      lastMessage: PropTypes.shape({
        sender: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
      }),
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    }),
  ),
  currentId: PropTypes.string,
  openDialog: PropTypes.func.isRequired,
};

export default ChatUsersList;
