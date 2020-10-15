import {
  LOAD_DIALOGS_SUCCESS,
  LOAD_DIALOGS,
  LOAD_DIALOGS_ERROR,
  LOAD_CHAT_SUCCESS,
  LOAD_CHAT_ERROR,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  OPEN_CHAT,
  CLOSE_CHAT,
  CREATE_NEW_DIALOG,
  LOAD_CHAT,
  CREATE_NEW_DIALOG_ERROR,
  READ_NEW_MESSAGES,
} from './types';

export const loadDialogs = () => ({
  type: LOAD_DIALOGS,
});

export const loadDialogsSuccess = (dialogs) => ({
  type: LOAD_DIALOGS_SUCCESS,
  payload: { dialogs },
});

export const loadDialogsError = () => ({
  type: LOAD_DIALOGS_ERROR,
});

export const openChat = () => ({
  type: OPEN_CHAT,
});

export const closeChat = () => ({
  type: CLOSE_CHAT,
});

export const createNewDialog = (partnerId) => ({
  type: CREATE_NEW_DIALOG,
  payload: { partnerId },
});

export const createNewDialogError = () => ({
  type: CREATE_NEW_DIALOG_ERROR,
});

export const loadChat = (id) => ({
  type: LOAD_CHAT,
  payload: { id },
});

export const loadChatSuccess = (chat) => ({
  type: LOAD_CHAT_SUCCESS,
  payload: { chat },
});

export const loadChatError = () => ({
  type: LOAD_CHAT_ERROR,
});

export const sendMessage = (chatId, partnerId, message) => ({
  type: SEND_MESSAGE,
  payload: { chatId, partnerId, message },
});

export const sendMessageSuccess = () => ({
  type: SEND_MESSAGE_SUCCESS,
});

export const sendMessageError = () => ({
  type: SEND_MESSAGE_ERROR,
});

export const readNewMessages = (dialogId) => ({
  type: READ_NEW_MESSAGES,
  payload: { dialogId },
});
