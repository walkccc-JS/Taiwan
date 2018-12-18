import React from 'react'
import moment from 'moment'

const PostSummary = ({ post }) => {
  return (
    <div className="card z-depth-0 post-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{ post.title }</span>
        <p>Posted by { post.authorFirstName } { post.authorLastName }</p>
        <p className="grey-text">Created at: { moment(post.createdAt.toDate()).calendar() }</p>
        { post.editedAt ? 
        <p className="grey-text">Edited at: { moment(post.editedAt.toDate()).calendar() }</p>
        : null }
      </div>
    </div>
  )
}

export default PostSummary
