import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { deletePost } from '../../store/actions/postActions'
import moment from 'moment'

class Post extends Component {
  handleDelete = (e) => {
    const { postId, post, auth } = this.props

    if (post && post.authorId === auth.uid) {
      this.props.deletePost(postId)
      this.props.history.push('/')
    } else {
      this.props.history.push('/posts/' + postId)
    }
  }

  render() {
    const { postId, post, user, auth } = this.props
    console.log(user)

    if (!auth.uid) return <Redirect to ='/signin' />

    if (post && user) {
      return (
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <div className="card">
              
              <div className="card-content black-text">
                <span className="card-title">{ post.title }</span>
                <p>{ post.content }</p>
                <br />
                <div>Posted by <Link to={'/user/' + user.id}>
                  { post.authorFirstName } { post.authorLastName }
                </Link></div>
                <div>{ moment(post.createdAt.toDate()).calendar() }</div>
              </div>

              { post && post.authorId === auth.uid ?
              <div className="card-action">
                <Link to='#' onClick={this.handleDelete} className="red-text">
                  <i className="material-icons">delete</i>
                </Link>
                <Link to={'/edit/' + postId} post={post} className="blue-text">
                  <i className="material-icons">create</i>
                </Link>
              </div>
              : null }

            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <div className="card">
              <div className="card-content">
                <p>Loading the post...</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const posts = state.firestore.data.posts
  const post = posts ? posts[id] : null
  const users = state.firestore.data.users
  const user = users && post ? users[post.authorId] : null

  return {
    post: post,
    postId: id,
    user: user,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (postId) => dispatch(deletePost(postId))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'posts' },
    { collection: 'users' }
  ])
)(Post)
