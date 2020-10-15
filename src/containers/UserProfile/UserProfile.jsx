import React from 'react';
import { useUserProfile } from '../../hooks';
import { Profile, PopUp, Loader, ErrorMessage } from '../../components';

const UserProfile = () => {
  const {
    name,
    surname,
    posts,
    avatarUrl,
    removePostData,
    removePost,
    closePopUp,
    loading,
    error,
  } = useUserProfile();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <>
      <Profile name={name} surname={surname} posts={posts} avatarUrl={avatarUrl} />
      {removePostData.postId && (
        <PopUp text="Удалить этот пост ?" confirm={removePost} dismiss={closePopUp} />
      )}
    </>
  );
};

export default UserProfile;
