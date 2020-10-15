import { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, scrollDialogOnMessage } from '../config/chat';
import { loadChat, readNewMessages, sendMessage } from '../containers/Chat/actions';
import { selectChat } from '../containers/Chat/selectors';

const useDialog = (currentDialog) => {
  const dispatch = useDispatch();

  const { name, surname, avatarUrl, chatId, id: partnerId } = currentDialog;
  const { currentChat, sendingMessage, chatLoading } = useSelector(selectChat);
  const [messageText, changeMessageText] = useState('');
  const messagesRef = createRef();

  const onTextareaChange = ({ target: { value } }) => changeMessageText(value);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const text = messageText.trim();
    if (!text) return;

    dispatch(sendMessage(chatId, partnerId, createMessage(text)));
    changeMessageText('');
  };

  useEffect(() => {
    dispatch(loadChat(chatId));
    dispatch(readNewMessages(partnerId));
  }, [currentDialog, dispatch, chatId, partnerId]);

  useEffect(() => scrollDialogOnMessage(messagesRef.current), [currentChat.messages, messagesRef]);

  return {
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
  };
};

export default useDialog;
