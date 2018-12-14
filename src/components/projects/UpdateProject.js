import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { updateProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'

class UpdateProject extends Component {
  state = {
    projectId: this.props.projectId,
    title: '',
    content: ''
  }

  componentDidMount() {
    const { project } = this.props
    if (project) {
      this.setState({
        title: project.title,
        content: project.content
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
    this.props.updateProject(this.state)
    this.props.history.push('/projects/' + this.state.projectId)
  }

  render() {
    const { auth, project } = this.props
    if (!auth.uid) return <Redirect to ='/signin' />
    console.log(this.props)

    if (project) {
      return (
        <div className="container">
          <form className="white" onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-3">Edit {project.title}</h5>
            <div className="input-field">
              <input type="text" id='title' value={this.state.title} onChange={this.handleChange} />
              <label htmlFor="title" className="active">Project Title</label>
            </div>
            <div className="input-field">
              <textarea id="content" value={this.state.content} className="materialize-textarea" onChange={this.handleChange}></textarea>
              <label htmlFor="content" className="active">Project Content</label>
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
          <p>Loading project...</p>
        </div>
      )
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const projects = state.firestore.data.projects
  const project = projects ? projects[id] : null
  return {
    project: project,
    projectId: id,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProject: (projectId) => dispatch(updateProject(projectId))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects' }
  ])
)(UpdateProject)
