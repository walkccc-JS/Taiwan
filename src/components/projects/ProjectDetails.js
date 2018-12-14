import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteProject } from '../../store/actions/projectActions'

class ProjectDetails extends Component {
  handleDelete = (e) => {
    const { projectId, project, auth } = this.props

    if (project && project.authorId === auth.uid) {
      this.props.deleteProject(projectId)
      this.props.history.push('/')
    } else {
      this.props.history.push('/projects/' + projectId)
    }
  }

  render() {
    // console.log(this.state)
    const { projectId, project, auth } = this.props

    if (!auth.uid) return <Redirect to ='/signin' />
    if (project) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <div className="card-title">{project.title}</div>
              <p>{project.content}</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
              <div>{moment(project.createdAt.toDate()).calendar()}</div>
            </div>

            { project && project.authorId === auth.uid ?             
              <div className="container">
                <div className="input-field">
                  <button className="btn pink lighten-1" onClick={this.handleDelete}>
                    Delete
                  </button>
                </div>
                <Link to={'/edit/' + projectId} className="btn pink lighten-1" project={project}>Update</Link>
              </div>
              : null }

          </div>
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
  console.log(state)
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
    deleteProject: (projectId) => dispatch(deleteProject(projectId))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects' }
  ])
)(ProjectDetails)
