import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFormOptions, validateForm } from '../config/authFormConfig';
import { logIn, registration, resetLogIn, resetRegistration } from '../containers/AuthPage/actions';
import { selectAuth } from '../containers/AuthPage/selectors';

const useAuthForm = (isReg, title) => {
  const dispatch = useDispatch();
  const { inProcess, registerSuccess, registerError, loggedInError } = useSelector(selectAuth);

  const [formOptions, changeFormOptions] = useState(createFormOptions(isReg, title));

  const resetReg = () => dispatch(resetRegistration());
  const resetLogin = () => dispatch(resetLogIn());

  const onFormChange = () =>
    changeFormOptions((state) => ({ ...state, ...validateForm(formOptions.inputs) }));
  const onFormSubmit = (event) => {
    isReg ? dispatch(registration(formOptions.data)) : dispatch(logIn(formOptions.data));

    event.preventDefault();
  };

  return {
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
  };
};

export default useAuthForm;
