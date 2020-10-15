export const createTextareaConfig = (placeholder = '', required = false) => {
  return {
    isValid: !required,
    value: '',
    placeholder,
    required,
  };
};

export const createBlogFormConfig = () => {
  return {
    isValid: false,
    havePhoto: false,
  };
};

export const validateTextarea = (value) => {
  return value.trim().length > 0;
};

export const createPostData = (text) => {
  const date = new Date();
  return {
    text,
    time: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
    likes: {},
  };
};
