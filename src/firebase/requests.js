import firebase from './';
import {
  DB_AVATAR_URL,
  DB_DIALOGS,
  DB_USERS,
  STORAGE_POSTS,
  STORAGE_USERS,
} from '../constants/dbPathnames';

export const uploadPostImage = (image, userId, postId) =>
  firebase
    .storage()
    .ref(STORAGE_USERS + userId + STORAGE_POSTS + postId)
    .put(image)
    .then(({ ref }) => ref.getDownloadURL());

export const setNewAvatarPath = (url) => {
  const id = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(DB_USERS + id + DB_AVATAR_URL)
    .set(url);
};

export const updateDialog = (id, partnerId, data) => {
  const ref = firebase.database().ref(DB_USERS + id + DB_DIALOGS);

  ref.child(partnerId).set(data);
};
