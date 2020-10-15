import React from 'react';
import { Loader, ErrorMessage } from '../../components';
import { useOtherProfile } from '../../hooks';
import { Profile } from '../../components';

const OtherProfile = () => {
  const { name, surname, avatarUrl, posts, loading, id, error } = useOtherProfile();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return <Profile name={name} surname={surname} avatarUrl={avatarUrl} posts={posts} userId={id} />;
};

export default OtherProfile;
