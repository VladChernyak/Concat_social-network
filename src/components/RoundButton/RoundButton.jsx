import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './RoundButton.scss';

const RoundButton = ({ className, children }) => {
  const classes = classNames('roundButton', { [className]: classNames });

  return <button className={classes}>{children}</button>;
};

RoundButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default RoundButton;
