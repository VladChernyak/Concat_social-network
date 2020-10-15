import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Indicator.scss';

const Indicator = ({ value, className }) => (
  <span className={classNames('indicator', { [className]: className })}>{value}</span>
);

Indicator.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

export default Indicator;
