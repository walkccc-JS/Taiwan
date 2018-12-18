import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { deletePost } from '../../store/actions/postActions'
import { likePost } from '../../store/actions/postActions'
import { dislikePost } from '../../store/actions/postActions'

class Post extends Component {
  handleDelete = (e) => {
    const { pid } = this.props
    this.props.deletePost(pid)
    this.props.history.push('/')
  }

  handleLike = (e) => {
    const { pid } = this.props
    this.props.likePost(pid)
  }

  handleDislike = (e) => {
    const { pid } = this.props
    this.props.dislikePost(pid)
  }

  render() {
    const { pid, post, auth } = this.props

    return (
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card">
            
            { post ? 
            <div className="card-content black-text">
              <span className="card-title">{ post.title }</span>
              <p>{ post.content }</p>
              <br />
              <p>Posted by <Link to={'/' + post.authorId}>
                { post.authorFirstName } { post.authorLastName }
              </Link></p>
              <p to='#' onClick={this.handleLike} className="green-text"><i className="material-icons">thumb_up</i>{ post.like }</p>
              <p to='#' onClick={this.handleDislike} className="red-text"><i className="material-icons">thumb_down</i>{ post.dislike }</p>
              <p className="grey-text">Created at: { moment(post.createdAt.toDate()).calendar() }</p>
              { post.editedAt ? 
              <p className="grey-text">Edited at: { moment(post.editedAt.toDate()).calendar() }</p>
              : null }
            </div>
            :
            <div className="card-content">
              <p>Loading the post...</p>
            </div> }

            { post && post.authorUid === auth.uid ?
            <div className="card-action">
              <Link to='#' onClick={this.handleDelete} className="red-text">
                <i className="material-icons right">delete</i>
              </Link>
              <Link to={'/edit/posts/' + pid} post={post} className="blue-text">
                <i className="material-icons right">create</i>
              </Link>
            </div> : null }

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const pid = props.match.params.pid
  const posts = state.firestore.data.posts
  const post = posts ? posts[pid] : null

  return {
    pid: pid,
    post: post,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (pid) => dispatch(deletePost(pid)),
    likePost: (pid) => dispatch(likePost(pid)),
    dislikePost: (pid) => dispatch(dislikePost(pid))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'posts' }
  ])
)(Post)
