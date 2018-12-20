import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { updatePost } from '../../store/actions/postActions'
import Loading from '../layout/Loading'

class UpdatePost extends Component {
  state = {
    pid: this.props.pid,
    title: '',
    subtitle: '',
    content: ''
  }

  componentDidMount() {
    const { post } = this.props
    if (post) {
      this.setState({
        title: post.title,
        subtitle: post.subtitle,
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
        <section className="section">
          <div className="container grid" style={{maxWidth: 1024}}>

            <div className="title">
              Edit Your Post
            </div>

            <form onSubmit={this.handleSubmit} >

              <div className="field">
                <label className="label">Title</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input" type="text" id="title" placeholder="Taiwan is great!" value={this.state.title} onChange={this.handleChange} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-smile-wink"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Subtitle</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input" type="text" id="subtitle" placeholder="Taiwan is beautiful!" value={this.state.subtitle} onChange={this.handleChange} />
                  <span className="icon is-small is-left">
                    <i className="far fa-smile-beam"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Content</label>
                <div className="control">
                  <textarea className="textarea" id="content" placeholder="Taiwan is awesome!" value={this.state.content} onChange={this.handleChange}></textarea>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link">Update</button>
                </div>
                <div className="control">
                  <Link to="/" className="button is-text">Cancel</Link>
                </div>
              </div>

            </form>
          </div>
        </section>
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
