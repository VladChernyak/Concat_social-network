import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../containers/UserProfile/actions';
import {
  createBlogFormConfig,
  createPostData,
  createTextareaConfig,
  validateTextarea,
} from '../config/blogFormConfig';
import { compressImage } from '../config/dataHandlers';

const useAddPostForm = () => {
  const dispatch = useDispatch();

  const [formOptions, changeFormOptions] = useState(createBlogFormConfig());
  const [textareaOptions, changeTextareaOptions] = useState(
    createTextareaConfig('Напишите что-нибудь'),
    true,
  );
  const [postImage, changeImage] = useState({ file: null, url: null });

  const onTextareaChange = ({ target: { value } }) => {
    changeFormOptions({ ...formOptions, isValid: validateTextarea(value) });
    changeTextareaOptions({ ...textareaOptions, value });
  };

  const sendPost = () => {
    const text = textareaOptions.value.trim();

    dispatch(addPost(createPostData(text), postImage.file));
    changeTextareaOptions({ ...textareaOptions, value: '' });
    changeImage({ file: null, url: null });
    changeFormOptions({ ...formOptions, isValid: false });
  };

  const onFileLoad = ({ target }) => {
    const handler = (blob) => {
      const url = URL.createObjectURL(blob);

      changeImage({ file: blob, url });
    };
    compressImage(target, 500, handler);
  };

  return {
    formOptions,
    textareaOptions,
    onTextareaChange,
    postImage,
    onFileLoad,
    sendPost,
  };
};

export default useAddPostForm;
