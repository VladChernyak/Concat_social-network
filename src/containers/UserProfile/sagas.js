import firebase from '../../firebase';
import { eventChannel, buffers } from 'redux-saga';
import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import { processUserData } from '../../config/dataHandlers';
import { setNewAvatarPath, uploadPostImage } from '../../firebase/requests';
import { ADD_POST, GET_USER_PROFILE_DATA, REMOVE_POST, TOGGLE_LIKE, UPLOAD_AVATAR } from './types';
import {
  DB_USERS,
  DB_POSTS,
  DB_IMAGE_URL,
  DB_LIKES,
  STORAGE_USERS,
  STORAGE_POSTS,
  STORAGE_AVATAR,
} from '../../constants/dbPathnames';
import {
  closeRemovePostPopUp,
  loadProfileDataError,
  loadProfileDataSuccess,
  updateAvatarLoading,
} from './actions';

const createProfileChannel = () => {
  const listener = eventChannel((emit) => {
    const id = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(DB_USERS + id);

    ref.on('value', (data) => emit(data.val()));

    return () => ref.off(listener);
  }, buffers.expanding());

  return listener;
};

const createUploadAvatarChannel = (image) => {
  return eventChannel((emit) => {
    const id = firebase.auth().currentUser.uid;
    const uploadTask = firebase
      .storage()
      .ref(STORAGE_USERS + id + STORAGE_AVATAR)
      .put(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        emit({ progress });
      },
      (error) => {
        emit({ error });
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => emit({ url }));
      },
    );

    return () => uploadTask.off('state_changed');
  });
};

function* workloadProfileData() {
  try {
    const updateChannel = createProfileChannel();

    while (true) {
      const data = yield take(updateChannel);
      yield put(loadProfileDataSuccess(processUserData(data)));
    }
  } catch {
    yield put(loadProfileDataError());
  }
}

function* workAddPost({ payload }) {
  try {
    const id = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(DB_USERS + id + DB_POSTS);
    const { postData, image } = payload;

    const { key } = yield call([ref, ref.push], postData);

    if (image) {
      const url = yield call(uploadPostImage, image, id, key);
      const imageRef = ref.child(key + DB_IMAGE_URL);

      yield call([imageRef, imageRef.set], url);
    }
  } catch (e) {
    console.log(e);
  }
}

function* workRemovePost({ payload: { postId, withImage } }) {
  try {
    const id = firebase.auth().currentUser.uid;
    const dbRef = firebase.database().ref(DB_USERS + id + DB_POSTS + postId);
    const imageRef = firebase.storage().ref(STORAGE_USERS + id + STORAGE_POSTS + postId);

    yield call([dbRef, dbRef.remove]);
    if (withImage) yield call([imageRef, imageRef.delete]);

    yield put(closeRemovePostPopUp());
  } catch (e) {
    console.log(e);
  }
}

function* workToggleLike({ payload: { userId, postId } }) {
  try {
    const id = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(DB_USERS + userId + DB_POSTS + postId + DB_LIKES);

    const likes = yield call([ref, ref.once], 'value');

    let likeId = null;
    const val = likes.val();

    if (val) {
      Object.entries(val).forEach(([key, value]) => {
        if (value === id) likeId = key;
      });
    }

    if (likeId) {
      ref.child(likeId).remove();
    } else {
      ref.push(id);
    }
  } catch (e) {
    console.log(e);
  }
}

function* workUploadAvatar({ payload: { image } }) {
  try {
    const channel = yield call(createUploadAvatarChannel, image);

    while (true) {
      const { progress, error, url } = yield take(channel, buffers.sliding(5));

      if (error) {
        console.log(error);
        channel.close();
        return;
      }

      if (url) {
        yield call(setNewAvatarPath, url);
        return;
      }

      yield put(updateAvatarLoading(progress));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchLoadProfileData() {
  yield takeEvery(GET_USER_PROFILE_DATA, workloadProfileData);
}

function* watchAddPost() {
  yield takeEvery(ADD_POST, workAddPost);
}

function* watchRemovePost() {
  yield takeEvery(REMOVE_POST, workRemovePost);
}

export function* watchToggleLike() {
  yield takeEvery(TOGGLE_LIKE, workToggleLike);
}

function* watchUploadAvatar() {
  yield takeEvery(UPLOAD_AVATAR, workUploadAvatar);
}

export default function* userProfileSaga() {
  yield all([
    watchLoadProfileData(),
    watchAddPost(),
    watchRemovePost(),
    watchToggleLike(),
    watchUploadAvatar(),
  ]);
}
