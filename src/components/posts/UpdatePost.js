import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { updatePost } from '../../store/actions/postActions'
import { Redirect } from 'react-router-dom'

class UpdatePost extends Component {
  state = {
    postId: this.props.postId,
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
    e.preventDefault()
    console.log(this.state)
    this.props.updatePost(this.state)
    this.props.history.push('/posts/' + this.state.postId)
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
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const posts = state.firestore.data.posts
  const post = posts ? posts[id] : null
  return {
    post: post,
    postId: id,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (postId) => dispatch(updatePost(postId))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'posts' }
  ])
)(UpdatePost)
