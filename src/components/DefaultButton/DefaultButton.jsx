import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './DefaultButton.scss';

const DefaultButton = ({ className, disabled, onClick, text }) => {
  const classes = classNames('button', { [className]: className });

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {text}
    </button>
  );
};

DefaultButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default DefaultButton;
