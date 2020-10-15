import React from 'react';
import { DefaultButton } from '../';
import PropTypes from 'prop-types';
import './PopUp.scss';

const PopUp = ({ text, confirm, dismiss }) => (
  <div className="popUp">
    <div className="popUp__form">
      <div className="popUp__title">{text}</div>
      <div className="popUp__buttons">
        <DefaultButton onClick={confirm} text="Ок" />
        <DefaultButton className={'cancel__btn'} onClick={dismiss} text="Отмена" />
      </div>
    </div>
  </div>
);

PopUp.propTypes = {
  text: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
};

export default PopUp;
