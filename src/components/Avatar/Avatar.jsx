import React from 'react';
import classNames from 'classnames';
import photo from '../../assets/img/avatar.png';
import PropTypes from 'prop-types';
import './Avatar.scss';

const Avatar = ({ className, avatarUrl, children }) => {
  const classes = classNames('avatar', { [className]: className });

  return (
    <div className={classes}>
      <img src={avatarUrl ? avatarUrl : photo} alt="" />
      {children}
    </div>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  avatarUrl: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

export default Avatar;
