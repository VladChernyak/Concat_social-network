import { all, call, put, takeEvery } from 'redux-saga/effects';
import firebase from '../../firebase';
import { AUTO_LOGIN, LOGOUT, LOG_IN, REGISTRATION } from './types';
import { DB_USERS } from '../../constants/dbPathnames';
import {
  autoLoginError,
  autoLoginSuccess,
  logInError,
  logInSuccess,
  registrationError,
  registrationSuccess,
} from './actions';

function* workLogIn({ payload }) {
  const { email, password } = payload;

  try {
    const auth = firebase.auth();
    const response = yield call([auth, auth.signInWithEmailAndPassword], email, password);

    const {
      user: { uid },
    } = response;

    localStorage.setItem('myId', uid);
    localStorage.setItem('authData', JSON.stringify({ email, password }));

    yield put(logInSuccess());
  } catch {
    yield put(logInError());
  }
}

function* workRegistration({ payload }) {
  const { email, password, name, surname } = payload;

  try {
    const auth = firebase.auth();
    const response = yield call([auth, auth.createUserWithEmailAndPassword], email, password);

    const {
      user: { uid },
    } = response;

    const usersRef = firebase.database().ref(DB_USERS + uid);
    yield call([usersRef, usersRef.set], { name, surname });

    yield put(registrationSuccess());
  } catch {
    yield put(registrationError());
  }
}

function* workAutoLogin() {
  const data = JSON.parse(localStorage.getItem('authData'));

  try {
    const auth = firebase.auth();
    yield call([auth, auth.signInWithEmailAndPassword], data.email, data.password);
    yield put(autoLoginSuccess());
  } catch {
    yield put(autoLoginError());
  }
}

function workLogOut() {
  try {
    firebase.auth().signOut();
    localStorage.clear();
  } catch (e) {
    console.log(e);
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN, workLogIn);
}

function* watchRegistration() {
  yield takeEvery(REGISTRATION, workRegistration);
}

function* watchAutoLogin() {
  yield takeEvery(AUTO_LOGIN, workAutoLogin);
}

function* watchLogOut() {
  yield takeEvery(LOGOUT, workLogOut);
}

export default function* authSaga() {
  yield all([watchLogIn(), watchRegistration(), watchAutoLogin(), watchLogOut()]);
}
