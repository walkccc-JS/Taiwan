import React from 'react'
import moment from 'moment'

const PostSummary = ({ post }) => {
  return (
    <div className="card z-depth-0 post-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{ post.title }</span>
        <p>Posted by { post.authorFirstName } { post.authorLastName }</p>
        <span className="green-text"><i className="material-icons">thumb_up</i>{ post.like }</span> <span className="red-text"><i className="material-icons">thumb_down</i>{ post.dislike }</span>
        <p className="grey-text">Created at: { moment(post.createdAt.toDate()).calendar() }</p>
        { post.editedAt ? 
        <p className="grey-text">Edited at: { moment(post.editedAt.toDate()).calendar() }</p>
        : null }
      </div>
    </div>
  )
}

export default PostSummary
