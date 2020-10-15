import React from 'react';
import { DefaultButton } from '../';
import { CameraIcon } from '../icons';
import { useAddPostForm } from '../../hooks';
import './AddPostForm.scss';

const AddPostForm = () => {
  const {
    formOptions,
    textareaOptions,
    onTextareaChange,
    postImage,
    onFileLoad,
    sendPost,
  } = useAddPostForm();

  return (
    <div className="addPost">
      <textarea
        value={textareaOptions.value}
        placeholder={textareaOptions.placeholder}
        onChange={onTextareaChange}></textarea>
      {postImage ? (
        <div className="image-preview">
          <img src={postImage.url} alt="" />
        </div>
      ) : null}
      <div className="controlPanel">
        <DefaultButton
          disabled={!postImage.file && !formOptions.isValid}
          className="addPost__button"
          text="Сохранить"
          onClick={sendPost}
        />
        <label className="addPhoto">
          <input type="file" onChange={onFileLoad} />
          <CameraIcon />
        </label>
      </div>
    </div>
  );
};

export default AddPostForm;
