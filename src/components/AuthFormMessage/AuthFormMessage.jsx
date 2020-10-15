import React from 'react';
import { DefaultButton } from '../';
import { SadIcon, SmileIcon } from '../icons';
import { Link } from 'react-router-dom';
import { AUTH } from '../../constants/pathnames';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './AuthFormMessage.scss';

const AuthFormMessage = ({ error, text, onClick }) => {
  const classes = classNames('auth__message', { error, success: !error });

  return (
    <div className={classes}>
      <p>{text}</p>
      <div className="auth__message-icon">{error ? <SadIcon /> : <SmileIcon />}</div>
      {error ? (
        <DefaultButton onClick={onClick} text="Еще раз" />
      ) : (
        <Link to={AUTH}>
          <DefaultButton onClick={onClick} text="Вход" />
        </Link>
      )}
    </div>
  );
};

AuthFormMessage.propTypes = {
  error: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AuthFormMessage;
