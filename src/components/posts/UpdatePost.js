import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { updatePost } from '../../store/actions/postActions'

class UpdatePost extends Component {
  state = {
    pid: this.props.pid,
    title: '',
    content: ''
  }

  componentDidMount() {
    const { post } = this.props
    if (post) {
      this.setState({
        title: post.title,
        content: post.content
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    const { pid } = this.state
    const { post } = this.props
    e.preventDefault()
    this.props.updatePost(this.state)
    this.props.history.push('/' + post.authorId + '/posts/' + pid)
  }

  render() {
    const { auth, post } = this.props
    if (!auth.uid) return <Redirect to ='/signin' />

    if (post) {
      return (
        <div className="container">
          <form className="white" onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-3">Edit {post.title}</h5>
            <div className="input-field">
              <input type="text" id='title' value={this.state.title} onChange={this.handleChange} />
              <label htmlFor="title" className="active">Post Title</label>
            </div>
            <div className="input-field">
              <textarea id="content" value={this.state.content} className="materialize-textarea" onChange={this.handleChange}></textarea>
              <label htmlFor="content" className="active">Post Content</label>
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1">Update</button>
            </div>
          </form>
        </div>
      )
    } else {
      return (
        <div className="container center">
          <p>Loading post...</p>
        </div>
      )
    }
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
    updatePost: (pid) => dispatch(updatePost(pid))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'posts' }
  ])
)(UpdatePost)
