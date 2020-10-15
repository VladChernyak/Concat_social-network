import React from 'react';
import { Link } from 'react-router-dom';
import { DefaultButton } from '..';
import PropTypes from 'prop-types';
import { AUTH, REG } from '../../constants/pathnames';
import './AuthFormButtons.scss';

const AuthFormButtons = ({ isReg, isValid }) =>
  isReg ? (
    <React.Fragment>
      <DefaultButton text="Зарегистрироваться" className="reg__btn" disabled={!isValid} />
      <Link to={AUTH}>
        <DefaultButton text="Уже есть аккаунт ?" />
      </Link>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <DefaultButton text="Войти" disabled={!isValid} />
      <Link to={REG}>
        <DefaultButton text="Регистрация" className="reg__btn" />
      </Link>
    </React.Fragment>
  );

AuthFormButtons.propTypes = {
  isReg: PropTypes.bool,
  isValid: PropTypes.bool.isRequired,
};

export default AuthFormButtons;
