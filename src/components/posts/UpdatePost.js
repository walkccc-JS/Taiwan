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
        <div className="row form-design z-depth-0">
          <div className="col s12 l6 offset-l3">
            <div className="card">
              
              <form className="white" onSubmit={this.handleSubmit}>
                <div className="card-action white">
                  <h3 className="center">Edit {post.title}</h3>
                </div><br />

                <div className="card-content">

                  <div className="form-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id='title' value={this.state.title} onChange={this.handleChange} />
                  </div><br />

                  <div className="form-field">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" className="materialize-textarea" value={this.state.content} onChange={this.handleChange}></textarea>
                  </div><br />

                  <div className="form-field center-align">
                    <button className="btn green z-depth-0">Update</button>
                  </div><br />

                </div>  
              </form>

            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container center-align">
          <h4 className="indigo-text">Loading post...</h4>
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
