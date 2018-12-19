import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addPost } from '../../store/actions/postActions'

class AddPost extends Component {
  state = {
    title: '',
    content: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addPost(this.state)
    this.props.history.push('/')
  }

  render() {
    const { auth } = this.props
    if (!auth.uid) return <Redirect to ='/signin' />

    return (
      <div className="row form-design z-depth-0">
        <div className="col s12 l6 offset-l3">
          <div className="card">
            
            <form className="white" onSubmit={this.handleSubmit}>
              <div className="card-action white">
                <h3 className="center">New Post</h3>
              </div><br />

              <div className="card-content">

                <div className="form-field">
                  <label htmlFor="title">Title</label>
                  <input type="text" id='title' onChange={this.handleChange} />
                </div><br />

                <div className="form-field">
                  <label htmlFor="content">Content</label>
                  <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                </div><br />

                <div className="form-field center-align">
                  <button className="btn green z-depth-0">Create</button>
                </div><br />

              </div>  
            </form>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => dispatch(addPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)
