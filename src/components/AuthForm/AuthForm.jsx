import React from 'react';
import { FormInput, AuthFormButtons, Loader, AuthFormMessage } from '../';
import { useAuthForm } from '../../hooks';
import PropTypes from 'prop-types';
import './AuthForm.scss';

const AuthForm = ({ isReg, title }) => {
  const {
    inProcess,
    registerSuccess,
    registerError,
    loggedInError,
    formOptions,
    changeFormOptions,
    onFormChange,
    onFormSubmit,
    resetReg,
    resetLogin,
  } = useAuthForm(isReg, title);

  return (
    <div className="auth__form">
      <h2>{formOptions.title}</h2>
      {inProcess ? (
        <Loader />
      ) : loggedInError ? (
        <AuthFormMessage
          onClick={resetLogin}
          text="Такого пользователя нет. Проверьте введенные данные"
          error={true}
        />
      ) : registerError ? (
        <AuthFormMessage
          onClick={resetReg}
          text="Что-то пошло не так. Проверьте введенные данные, или повторите попытку позже"
          error={true}
        />
      ) : registerSuccess ? (
        <AuthFormMessage onClick={resetReg} text="Регистрация прошла успешно !" />
      ) : (
        <form onSubmit={onFormSubmit} onChange={onFormChange}>
          {formOptions.inputs.map((input, idx) => (
            <FormInput
              key={input.placeholder + idx}
              type={input.type}
              placeholder={input.placeholder}
              required={input.required}
              value={input.value}
              changeFormOptions={changeFormOptions}
              idx={idx}
              valid={input.isValid}
              validate={input.validate}
              touched={input.touched}
            />
          ))}
          <AuthFormButtons isValid={formOptions.isValid} isReg={isReg} />
        </form>
      )}
    </div>
  );
};

AuthForm.propTypes = {
  isReg: PropTypes.bool,
  title: PropTypes.string,
};

export default AuthForm;
