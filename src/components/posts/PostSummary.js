import React from 'react'
import moment from 'moment'

const PostSummary = ({ post }) => {
  return (
    <div className="card z-depth-0 post-summary">
      <div className="card-content grey-text text-darken-3">
        <div className="card-title truncate">{ post.title }</div>
        <p>Posted by { post.authorFirstName } { post.authorLastName }</p>
        
        <div href="#" class="btn-small white green-text z-depth-0">
          <i className="material-icons left">thumb_up</i>
          <span>{ post.like }</span>
        </div>
        <div href="#" class="btn-small white red-text z-depth-0">
          <i className="material-icons left">thumb_down</i>
          <span>{ post.dislike }</span>
        </div>

        <p className="grey-text">Created at: { moment(post.createdAt.toDate()).calendar() }</p>
        { post.editedAt ? 
        <p className="grey-text">Edited at: { moment(post.editedAt.toDate()).calendar() }</p>
        : null }
      </div>
    </div>
  )
}

export default PostSummary
