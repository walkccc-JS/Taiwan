import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class User extends Component {
  render() {
    const { user, auth } = this.props

    if (user) {
      return (
        <div className="container row">
          <div className="col s12 offset-m3 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{user.firstName} {user.lastName}</span>
                <p>@{user.id}</p>
                <p>{user.email}</p>

                { user && user.email === auth.email ?
                  <div className="container">
                    <Link to={'/user/edit/' + user.id} className="btn pink lighten-1" user={user}>Update</Link>
                  </div>
                  : null }

              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container center">
          <p>Loading the user...</p>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const uid = ownProps.match.params.id
  const users = state.firestore.data.users

  for (let key in users) {
    if (users[key].id === uid) {
      var user = users[key];
      break;
    }
  }

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
)(User)
