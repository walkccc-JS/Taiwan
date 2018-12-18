import React from 'react'
import { Link } from 'react-router-dom'
import PostSummary from './PostSummary'

const PostList = ({ uid, posts }) => {
  return (
    <div className="post-list section">
      { posts && posts.map(post => {
        return (
          <Link to={'/' + uid + '/posts/' + post.id} key={post.id}>
            <PostSummary post={post} />
          </Link>
        )
      })}
    </div>
  )
}

export default PostList
