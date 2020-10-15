import { buffers, eventChannel } from 'redux-saga';
import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import { updateDialog } from '../../firebase/requests';
import firebase from '../../firebase';
import {
  createNewDialogError,
  loadChatError,
  loadChatSuccess,
  loadDialogsError,
  loadDialogsSuccess,
  sendMessageError,
  sendMessageSuccess,
} from './actions';
import {
  CREATE_NEW_DIALOG,
  LOAD_CHAT,
  LOAD_DIALOGS,
  READ_NEW_MESSAGES,
  SEND_MESSAGE,
} from './types';
import { DB_CHATS, DB_DIALOGS, DB_MESSAGES, DB_USERS } from '../../constants/dbPathnames';

const createLoadDialogsChannel = () => {
  const listener = eventChannel((emit) => {
    const id = firebase.auth().currentUser.uid;
    const usersRef = firebase.database().ref(DB_USERS);
    const dialogsRef = usersRef.child(id + DB_DIALOGS);

    dialogsRef.on('value', () => {
      usersRef.once('value', (response) => {
        const users = response.val();
        const data = users[id].dialogs ? users[id].dialogs : {};

        const dialogs = Object.entries(data).map(([userId, data]) => {
          const user = users[userId];

          return {
            id: userId,
            name: user.name,
            surname: user.surname,
            avatarUrl: user.avatarUrl,
            ...data,
          };
        });

        emit(dialogs);
      });
    });

    return () => dialogsRef.off(listener);
  });

  return listener;
};

const createLoadChatChannel = (id) => {
  const listener = eventChannel((emit) => {
    const ref = firebase.database().ref(DB_CHATS + id);

    ref.on('value', (snapshot) => {
      const val = snapshot.val();
      const chat = val ? val : {};

      emit(chat);
    });

    return () => ref.off(listener);
  }, buffers.expanding());

  return listener;
};

function* workLoadDialogs() {
  try {
    const channel = createLoadDialogsChannel();

    while (true) {
      const dialogs = yield take(channel);
      yield put(loadDialogsSuccess(dialogs));
    }
  } catch {
    yield put(loadDialogsError());
  }
}

function* workCreateNewDialog({ payload: { partnerId } }) {
  try {
    const id = firebase.auth().currentUser.uid;
    yield call(updateDialog, id, partnerId, { chatId: 0 });
  } catch {
    yield put(createNewDialogError());
  }
}

function* workLoadChat({ payload: { id } }) {
  try {
    const channel = createLoadChatChannel(id);

    while (true) {
      const chat = yield take(channel);
      yield put(loadChatSuccess(chat));
    }
  } catch {
    yield put(loadChatError());
  }
}

function* workSendMessage({ payload: { chatId, partnerId, message } }) {
  try {
    const id = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref();

    if (!chatId) {
      const chatsRef = ref.child(DB_CHATS);
      const { key } = yield call([chatsRef, chatsRef.push], { messages: [] });

      chatId = key;
    }

    const messagesRef = ref.child(DB_CHATS + chatId + DB_MESSAGES);
    const dialogRef = ref.child(DB_USERS + partnerId + DB_DIALOGS + id);

    yield call([messagesRef, messagesRef.push], message);

    const snapshot = yield call([dialogRef, dialogRef.once], 'value');
    const val = snapshot.val();

    const newMessages = val && val.newMessages ? val.newMessages + 1 : 1;

    yield call(updateDialog, id, partnerId, { lastMessage: message, chatId });
    yield call(updateDialog, partnerId, id, { lastMessage: message, newMessages, chatId });

    yield put(sendMessageSuccess());
  } catch {
    yield put(sendMessageError());
  }
}

function* workReadNewMessages({ payload: { dialogId } }) {
  try {
    const id = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(DB_USERS + id + DB_DIALOGS + dialogId);

    const snapshot = yield call([ref, ref.once], 'value');
    const val = snapshot.val();

    yield call(updateDialog, id, dialogId, { ...val, newMessages: null });
  } catch (e) {
    console.log(e);
  }
}

function* watchLoadDialogs() {
  yield takeEvery(LOAD_DIALOGS, workLoadDialogs);
}

function* watchCreateNewDialog() {
  yield takeEvery(CREATE_NEW_DIALOG, workCreateNewDialog);
}

function* watchLoadChat() {
  yield takeEvery(LOAD_CHAT, workLoadChat);
}

function* watchSendMessage() {
  yield takeEvery(SEND_MESSAGE, workSendMessage);
}

function* watchReadNewMessages() {
  yield takeEvery(READ_NEW_MESSAGES, workReadNewMessages);
}

export default function* chatSaga() {
  yield all([
    watchLoadDialogs(),
    watchCreateNewDialog(),
    watchLoadChat(),
    watchSendMessage(),
    watchReadNewMessages(),
  ]);
}
