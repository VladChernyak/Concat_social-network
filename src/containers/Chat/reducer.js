import {
  LOAD_DIALOGS,
  LOAD_DIALOGS_SUCCESS,
  LOAD_DIALOGS_ERROR,
  LOAD_CHAT_ERROR,
  LOAD_CHAT,
  LOAD_CHAT_SUCCESS,
  OPEN_CHAT,
  CLOSE_CHAT,
  CREATE_NEW_DIALOG_ERROR,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
} from './types';

const initialState = {
  dialogs: [],
  dialogsLoading: true,
  currentChat: {},
  chatLoading: true,
  chatOpened: false,
  sendingMessage: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DIALOGS:
      return { ...state, dialogsLoading: true, error: false };
    case LOAD_DIALOGS_SUCCESS:
      return { ...state, dialogs: action.payload.dialogs, dialogsLoading: false };
    case OPEN_CHAT:
      return { ...state, chatOpened: true };
    case CLOSE_CHAT:
      return { ...state, chatOpened: false, chatLoading: true, currentChat: {} };
    case LOAD_CHAT:
      return { ...state, chatLoading: true };
    case LOAD_CHAT_SUCCESS:
      return { ...state, chatLoading: false, currentChat: action.payload.chat };
    case SEND_MESSAGE:
      return { ...state, sendingMessage: true };
    case SEND_MESSAGE_SUCCESS:
      return { ...state, sendingMessage: false };
    case LOAD_DIALOGS_ERROR:
    case CREATE_NEW_DIALOG_ERROR:
    case LOAD_CHAT_ERROR:
    case SEND_MESSAGE_ERROR:
      return { ...state, dialogsLoading: false, chatLoading: false, error: true };
    default:
      return state;
  }
};
