import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class User extends Component {
  render() {
    const { user, auth } = this.props

    // console.log(user)
    // console.log(auth)

    if (user) {
      return (
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="card">
              <div className="card-image">
                <img src="https://imgur.com/kGfAjR2.png" alt="hippo" />
                <span className="card-title">{ user.firstName } { user.lastName }</span>

                { user && user.email === auth.email ?
                  <Link to={'/user/edit/' + user.id} user={user} className="btn-floating halfway-fab waves-effect waves-light red">
                    <i className="material-icons">create</i>
                  </Link>
                  : null }

              </div>
              <div className="card-content">
                <p><a href={'/user/' + user.id}>@{ user.id }</a></p>
                <p><a href={'mailto:' + user.email}>{ user.email }</a></p>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="card">
              <div className="card-image">
                <img src="https://imgur.com/kGfAjR2.png" alt="hippo" />
              </div>
              <div className="card-content">
                <p>Loading the user...</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.uid
  const users = state.firestore.data.users

  for (let key in users) {
    if (users[key].id === id) {
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
