import React from 'react';
import { ChatUsersList, Dialog, Loader, ErrorMessage } from '../../components';
import classNames from 'classnames';
import { useChat } from '../../hooks';
import './Chat.scss';

const Chat = () => {
  const {
    dialogs,
    dialogsLoading,
    currentDialog,
    chatOpened,
    openChat,
    closeChat,
    partnerId,
    error,
  } = useChat();

  if (error) return <ErrorMessage />;

  return (
    <div className="chat">
      <div className={classNames('chat__leftSide', { opened: !chatOpened })}>
        <h1>Сообщения</h1>
        {dialogsLoading ? (
          <Loader />
        ) : (
          <ChatUsersList dialogs={dialogs} currentId={partnerId} openDialog={openChat} />
        )}
      </div>
      <div className="chat__rightSide">
        {currentDialog && <Dialog currentDialog={currentDialog} closeDialog={closeChat} />}
      </div>
    </div>
  );
};

export default Chat;
