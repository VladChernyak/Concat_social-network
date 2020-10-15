import is from 'is_js';

export const createFormOptions = (isReg, title) => {
  return {
    isValid: false,
    inputs: isReg ? createRegFields() : createSignInFields(),
    title: isReg ? 'Регистрация' : title,
  };
};

export const validateForm = (fields) => {
  const config = {
    isValid: false,
    data: Object.create(null),
  };

  if (fields.every((el) => el.isValid)) {
    fields.forEach((input) => (config.data[input.name] = input.value));

    config.isValid = true;
  }

  return config;
};

const createFieldOption = (
  type = 'text',
  name,
  placeholder = '',
  required = false,
  validate = null,
) => {
  return {
    touched: false,
    value: '',
    isValid: !required,
    type,
    name,
    placeholder,
    required,
    validate,
  };
};

const createSignInFields = () => {
  return [
    createFieldOption('email', 'email', 'Введите email', true, is.email),
    createFieldOption('password', 'password', 'Введите пароль', true, validatePassword),
  ];
};

const createRegFields = () => {
  return [
    createFieldOption('text', 'name', 'Ваше имя', true, validateName),
    createFieldOption('text', 'surname', 'Ваша фамилия', true, validateName),
    ...createSignInFields(),
    createFieldOption('password', 'repeatPassword', 'Повторите пароль', true, comparePasswords),
  ];
};

const validatePassword = (value, inputs) => {
  return value.length >= 6 && comparePasswords(value, inputs);
};

const validateName = (value) => {
  return value.length <= 15 && value.length >= 2;
};

export const comparePasswords = (value, inputs) => {
  return inputs.every((data) => {
    return data.touched && data.type === 'password' ? data.value === value : true;
  });
};
