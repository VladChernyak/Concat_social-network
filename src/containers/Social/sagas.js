import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getUsersListError, getUsersListSuccess } from './actions';
import { GET_USERS_LIST } from './types';
import { DB_USERS } from '../../constants/dbPathnames';
import firebase from '../../firebase';

function* workGetUsersList() {
  try {
    const ref = firebase.database().ref(DB_USERS);

    const snapshot = yield call([ref, ref.once], 'value');
    yield put(getUsersListSuccess(snapshot.val()));
  } catch {
    yield put(getUsersListError());
  }
}

function* watchGetUsersList() {
  yield takeEvery(GET_USERS_LIST, workGetUsersList);
}

export default function* socialSaga() {
  yield all([watchGetUsersList()]);
}
