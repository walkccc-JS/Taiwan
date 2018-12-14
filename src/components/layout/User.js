import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class ProjectDetails extends Component {
  render() {
    const { user } = this.props
    console.log(user)

    // if (!auth.uid) return <Redirect to ='/signin' />
    if (user) {
      return (
        <div className="container">
          <div className="card-content">
            <div className="card-title">id: {user.id}</div>
            <div className="card-title">email: {user.email}</div>
            <div className="card-title">Name: {user.firstName} {user.lastName}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container center">
          <p>Loading user...</p>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = state.firebase.auth.uid
  const users = state.firestore.data.users
  const user = users ? users[id] : null
  // console.log(user)
  return {
    user: user,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'users' }
  ])
)(ProjectDetails)
