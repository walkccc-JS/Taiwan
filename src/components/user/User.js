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
                <img src="https://i1.wp.com/blog.dcshow.cc/wp-content/uploads/2018/01/dc-show-cover.jpg?w=945" alt="girl" />
                <span className="card-title">{ user.firstName } { user.lastName }</span>

                { user && user.email === auth.email ?
                  <Link to={'/edit/' + user.id} user={user} className="btn-floating halfway-fab waves-effect waves-light red">
                    <i className="material-icons">create</i>
                  </Link>
                  : null }

              </div>
              <div className="card-content">
                <p><a href={'/' + user.id}>@{ user.id }</a></p>
                <p><a href={'mailto:' + user.email}>{ user.email }</a></p>
                <p><Link to={'/' + user.id + '/posts'}>See { user.firstName } { user.lastName }'s all posts</Link></p>
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
                <img src="https://i1.wp.com/blog.dcshow.cc/wp-content/uploads/2018/01/dc-show-cover.jpg?w=945" alt="girl" />
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
  const users = state.firestore.ordered.users
  const user = users ? users[0] : null

  return {
    user: user,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    const uid = props.match.params.uid
    return (
      [
        { collection: 'users', where: ['id', '==', uid] }
      ]
    )
  })
)(User)
