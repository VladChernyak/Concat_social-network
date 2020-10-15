import firebase from '../../firebase';
import { eventChannel, buffers } from 'redux-saga';
import { all, put, take, takeEvery } from 'redux-saga/effects';
import { DB_USERS } from '../../constants/dbPathnames';
import { loadProfileDataSuccess, loadProfileDataError } from './actions';
import { LOAD_PROFILE_DATA } from './types';

const createLoadProfileDataChannel = (id) => {
  const listener = eventChannel((emit) => {
    const ref = firebase.database().ref(DB_USERS + id);

    ref.on('value', (snapshot) => {
      const { name, surname, avatarUrl, posts } = snapshot.val();

      const data = {
        posts: posts || {},
        name,
        surname,
        avatarUrl,
      };

      emit(data);
    });

    return () => ref.off(listener);
  }, buffers.expanding());

  return listener;
};

function* workLoadProfileData({ payload: { id } }) {
  try {
    const channel = createLoadProfileDataChannel(id);

    while (true) {
      const data = yield take(channel);
      yield put(loadProfileDataSuccess(data));
    }
  } catch {
    yield put(loadProfileDataError());
  }
}

function* watchLoadProfileData() {
  yield takeEvery(LOAD_PROFILE_DATA, workLoadProfileData);
}

export default function* otherProfileSaga() {
  yield all([watchLoadProfileData()]);
}
