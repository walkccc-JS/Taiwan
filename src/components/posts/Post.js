import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { deletePost } from '../../store/actions/postActions'
import { likePost } from '../../store/actions/postActions'
import { dislikePost } from '../../store/actions/postActions'
import Loading from '../layout/Loading'
import './Post.css'
// import './debug.css'

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
    const { pid, post, user, auth } = this.props

    if (post) {
      return (
        <div>
          <section className="section is-paddingless-horizontal">
            <div className="container grid">
              <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                  <li><a href="/">Home</a></li>
                  <li className="is-active"><Link to="#" aria-current="page">{ post.title }</Link></li>
                </ul>
              </nav>
            </div>
          </section>
		
          {/* .section */}
          <section className="section is-paddingless-horizontal" style={{paddingTop: 0}}>
            <div className="container grid" style={{maxWidth: 1024}}>

              {/* .media */}
              <article className="media center">
                <figure className="media-left">
                  <span className="image is-64x64">
                    { user && user.img ? 
                    <img src={user.img} alt="avatar" />
                    : <img src="http://img.tagdelight.com/201807/1097.jpg" alt="girl" /> }
                  </span>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>{post.authorFirstName} {post.authorLastName}</strong> <a href={'/' + post.authorId}>@{post.authorId}</a><br />
                      { user && user.message ?
                      <span className="has-text-grey">{ user.message }</span>
                      : null }
                      { user && user.message ? <br /> : null }
                      <span><time dateTime={moment(post.createdAt.toDate()).calendar()}>{ moment(post.createdAt.toDate()).calendar() }</time></span>
                      { post.editedAt ? 
                      <span><time dateTime={moment(post.editedAt.toDate()).calendar()}> · { moment(post.editedAt.toDate()).calendar() }</time></span>
                      : null }
                    </p>
                  </div>
                </div>

                { post.authorUid === auth.uid ?
                <div>
                  <Link to={'/edit/posts/' + pid} post={post} className="button">
                    <span className="icon is-small">
                      <i className="fas fa-edit"></i>
                    </span>
                  </Link>
                  <Link to='#' onClick={this.handleDelete} className="button has-text-danger">
                    <span className="icon">
                      <i className="fas fa-trash"></i>
                    </span>
                  </Link>
                </div>
                : null }
              </article>
              {/* /.media */}

              {/* .section */}
              <div className="section is-paddingless-horizontal">
                <h1 className="title is-2">
                  {post.title}
                </h1>
                <h2 className="subtitle is-3 has-text-grey-light">
                  {post.subtitle}
                </h2>
              </div>
              {/* /.section */}

              <div className="content is-medium">
                { post.content }

                <br />
                <br />

                <div className="field is-grouped">
                  
                  <div className="control">
                    <button onClick={this.handleDislike} className="button is-success">
                      <i className="fas fa-thumbs-up"></i>
                      { post.like }
                    </button>
                  </div>

                  <div className="control">
                    <button onClick={this.handleLike} className="button is-danger">
                      <i className="fas fa-thumbs-down"></i>
                      { post.dislike }
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </section>
        </div>
      )
    } else {
      return (
        <Loading />
      )
    }

  }
}

const mapStateToProps = (state, props) => {
  const pid = props.match.params.pid
  const posts = state.firestore.data.posts
  const post = posts ? posts[pid] : null
  const users = state.firestore.ordered.users
  const user = users ? users[0] : null

  return {
    pid: pid,
    post: post,
    user: user,
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
  firestoreConnect(props => {
    const id = props.match.params.id
    return (
      [
        { collection: 'posts' },
        { collection: 'users', where: ['id', '==', id] }
      ]
    )
  })
)(Post)
