import React from 'react';
import { Avatar, ProgressBar } from '../';
import { CameraIcon } from '../icons';
import { useAvatarWithLoad } from '../../hooks';
import PropTypes from 'prop-types';
import './AvatarWithLoad.scss';

const AvatarWithLoad = ({ className }) => {
  const { avatarUpload, avatarUrl, loadAvatar } = useAvatarWithLoad();
  const isUpload = avatarUpload !== null;

  return (
    <Avatar avatarUrl={isUpload ? null : avatarUrl} className={className}>
      {!isUpload ? (
        <div className="avatar__load-new">
          <label>
            <div className="camera-icon__wrapper">
              <CameraIcon />
            </div>
            <input onChange={loadAvatar} accept="image/jpeg, image/png" type="file" />
          </label>
        </div>
      ) : null}
      {isUpload && (
        <div className="avatar__progressbar">
          <ProgressBar value={avatarUpload} />
        </div>
      )}
    </Avatar>
  );
};

AvatarWithLoad.propTypes = {
  className: PropTypes.string,
};

export default AvatarWithLoad;
