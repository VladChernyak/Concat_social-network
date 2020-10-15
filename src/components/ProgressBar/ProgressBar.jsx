import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.scss';

const ProgressBar = ({ value }) => (
  <progress className="progressBar" value={value} max="100"></progress>
);

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ProgressBar;
