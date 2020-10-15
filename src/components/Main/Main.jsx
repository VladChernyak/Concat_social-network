import React from 'react';
import PropTypes from 'prop-types';
import './Main.scss';

const Main = ({ children }) => <main className="main">{children}</main>;

Main.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

export default Main;
