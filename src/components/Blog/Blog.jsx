import React from 'react';
import { Post, AddPostForm } from '../';
import PropTypes from 'prop-types';
import './Blog.scss';

const Blog = ({ posts, name, surname, avatarUrl, userId, noAdd }) => (
  <section className="blog">
    <h2 className="blog__title">
      Посты <div className="blog__posts-count">{Object.keys(posts).length}</div>
    </h2>
    {noAdd || <AddPostForm />}
    <div className="blog__posts">
      {Object.entries(posts)
        .reverse()
        .map(([id, post]) => (
          <Post
            avatarUrl={avatarUrl}
            key={id}
            {...post}
            name={name}
            surname={surname}
            postId={id}
            userId={userId}
          />
        ))}
    </div>
  </section>
);

Blog.propTypes = {
  posts: PropTypes.objectOf(
    PropTypes.shape({
      text: PropTypes.string,
      imageUrl: PropTypes.string,
      time: PropTypes.string.isRequired,
      likes: PropTypes.objectOf(PropTypes.string),
    }),
  ),
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  userId: PropTypes.string,
  noAdd: PropTypes.bool,
};

export default Blog;
