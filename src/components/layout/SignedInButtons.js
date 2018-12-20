import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
// import { deleteUser } from '../../store/actions/authActions'

class SignedInButtons extends Component {
  // handleDelete = (e) => {
  //   const { uid } = this.props.auth
  //   this.props.deleteUser(uid)
  //   this.props.history.push('/') 
  // }

  render() {
    // console.log(this.props.auth)
    return (
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a href="/" onClick={this.props.signOut} className="button is-primary">
              <strong>Log out</strong>
            </a>
            {/* <Link to="/" onClick={this.handleDelete} className="button is-danger">
              <strong>Delete</strong>
            </Link> */}
          </div>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     auth: state.firebase.auth
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    // deleteUser: (uid) => dispatch(deleteUser(uid))
  }
}

export default connect(null, mapDispatchToProps)(SignedInButtons)