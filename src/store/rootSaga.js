import { all } from 'redux-saga/effects';
import authSaga from '../containers/AuthPage/sagas';
import userProfileSaga from '../containers/UserProfile/sagas';
import usersListSocial from '../containers/Social/sagas';
import otherProfileSaga from '../containers/OtherProfile/sagas';
import chatSaga from '../containers/Chat/sagas';

export default function* rootSaga() {
  yield all([authSaga(), userProfileSaga(), usersListSocial(), otherProfileSaga(), chatSaga()]);
}
