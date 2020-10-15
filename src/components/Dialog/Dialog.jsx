import React from 'react';
import { Message, Loader } from '../';
import { ArrowInCircleTop, ArrowLeftIcon } from '../icons';
import { submitTextarea } from '../../config/chat';
import { useDialog } from '../../hooks';
import PropTypes from 'prop-types';
import './Dialog.scss';

const Dialog = ({ currentDialog, closeDialog }) => {
  const {
    name,
    surname,
    avatarUrl,
    currentChat,
    chatLoading,
    messagesRef,
    sendingMessage,
    messageText,
    onFormSubmit,
    onTextareaChange,
  } = useDialog(currentDialog);

  return (
    <div className="dialog">
      <div className="dialog__title">
        <button className="dialog__close" onClick={closeDialog}>
          <ArrowLeftIcon />
        </button>
        <h2 className="dialog__currentName">{name + ' ' + surname}</h2>
      </div>
      <div className="line"></div>
      {chatLoading ? (
        <Loader />
      ) : (
        <>
          <div className="dialog__messages" ref={messagesRef}>
            {currentChat.messages ? (
              Object.entries(currentChat.messages).map(([id, data]) => (
                <Message
                  key={id}
                  avatarUrl={avatarUrl}
                  senderName={name + ' ' + surname}
                  {...data}
                />
              ))
            ) : (
              <div className="dialog__no-messages">Нет сообщений</div>
            )}
          </div>
          <form className="dialog__input" onSubmit={onFormSubmit}>
            <textarea
              value={messageText}
              onChange={onTextareaChange}
              onKeyPress={sendingMessage ? null : submitTextarea}
              placeholder="Введите сообщение"></textarea>
            <button type="submit" className="sendButton" disabled={sendingMessage}>
              <ArrowInCircleTop />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

Dialog.propTypes = {
  currentDialog: PropTypes.shape({
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
  }).isRequired,
  closeDialog: PropTypes.func.isRequired,
};

export default Dialog;
