import React from 'react';
import { Avatar } from '../';
import { CrossIcon, HeartIcon } from '../icons';
import { usePost } from '../../hooks';
import PropTypes from 'prop-types';
import './Post.scss';

const Post = ({ name, surname, text, likes, time, postId, userId, avatarUrl, imageUrl }) => {
  const { likeUsers, showPopUp, setLike, likesClasses } = usePost(postId, userId, likes);

  return (
    <article className="post">
      <div className="post__info">
        <Avatar avatarUrl={avatarUrl} className="post__authorPhoto" />
        <div className="post__infoText">
          <h3 className="post__authorName">{name + ' ' + surname}</h3>
          <time dateTime={time}>{time}</time>
        </div>
      </div>
      <p className="post__text">{text}</p>
      {imageUrl ? (
        <div className="post__image-wrapper">
          <div className="post__image">
            <img src={imageUrl} alt="" />
          </div>
        </div>
      ) : null}
      <button onClick={setLike} className={likesClasses}>
        <span className="like-icon">
          <HeartIcon />
        </span>
        <span className="like-count">{likeUsers.length}</span>
      </button>
      {!userId ? (
        <button onClick={() => showPopUp(postId, !!imageUrl)} className="post__remove">
          <CrossIcon />
        </button>
      ) : null}
    </article>
  );
};

Post.propTypes = {
  text: PropTypes.string,
  imageUrl: PropTypes.string,
  time: PropTypes.string.isRequired,
  likes: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  userId: PropTypes.string,
  postId: PropTypes.string.isRequired,
};

export default Post;
