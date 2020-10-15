import React from 'react';
import { SadIcon } from '../icons';
import './ErrorMessage.scss';

const ErrorMessage = () => (
  <div className="error-message">
    <SadIcon />
    <h1>Что-то пошло не так</h1>
    <p>Повторите попытку позже</p>
  </div>
);

export default ErrorMessage;
