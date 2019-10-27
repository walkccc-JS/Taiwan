import React from 'react';
import { Link } from 'react-router-dom';
import PostSummary from './PostSummary';

const PostList = ({ posts }) => {
  return (
    <div>
      {posts &&
        posts.map(post => {
          return (
            <Link to={'/' + post.authorId + '/posts/' + post.id} key={post.id}>
              <PostSummary post={post} />
            </Link>
          );
        })}
    </div>
  );
};

export default PostList;
