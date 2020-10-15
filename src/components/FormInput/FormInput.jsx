import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './FormInput.scss';

const FormInput = ({
  className,
  valid,
  touched,
  required,
  type,
  placeholder,
  changeFormOptions,
  idx,
  value,
  validate,
}) => {
  const classes = classNames('form-input', {
    [className]: className,
    'not-valid': !valid && touched,
  });

  return (
    <input
      className={classes}
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        const value = e.target.value;

        changeFormOptions((state) => {
          const newInputs = [...state.inputs];

          newInputs[idx].value = value;
          newInputs[idx].touched = true;

          if (validate) {
            newInputs[idx].isValid = validate(value, newInputs);
          }

          return {
            ...state,
            inputs: newInputs,
          };
        });
      }}
    />
  );
};

FormInput.propTypes = {
  className: PropTypes.string,
  changeFormOptions: PropTypes.func.isRequired,
  idx: PropTypes.number,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  touched: PropTypes.bool.isRequired,
  type: PropTypes.string,
  validate: PropTypes.func,
  valid: PropTypes.bool.isRequired,
  value: PropTypes.string,
};

export default FormInput;
