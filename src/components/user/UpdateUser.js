import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { updateUser } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class UpdateUser extends Component {
  state = {
    uid: '',
    id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''    
  }

  componentDidMount() {
    const { auth, user } = this.props
    if (user) {
      this.setState({
        uid: auth.uid,
        id: user.id,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName
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
    this.props.updateUser(this.state)
    this.props.history.push('/user/' + this.state.id)
  }

  render() {
    const { auth, user } = this.props

    if (user && auth.email !== user.email) return <Redirect to ={'/user/' + user.id} />
    if (user) {
      return (
        <div className="container">
          <form className="white" onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-3">Edit your profile</h5>

            <div className="input-field">
              <label htmlFor="id" className="active">ID</label>
              <input type="text" id="id" value={this.state.id} onChange={this.handleChange} />
            </div>

            <div className="input-field">
              <label htmlFor="email" className="active">Email</label>
              <input type="email" id="email" value={this.state.email} onChange={this.handleChange} />
            </div>

            <div className="input-field">
              <label htmlFor="password" className="active">Password</label>
              <input type="password" id="password" value={this.state.password} onChange={this.handleChange} />
            </div>

            <div className="input-field">
              <label htmlFor="firstName" className="active">First Name</label>
              <input type="text" id="firstName" value={this.state.firstName} onChange={this.handleChange} />
            </div>

            <div className="input-field">
              <label htmlFor="lastName" className="active">Last Name</label>
              <input type="text" id="lastName" value={this.state.lastName} onChange={this.handleChange} />
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
          <p>Loading user...</p>
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

  // console.log(user)
  return {
    user: user,
    userId: uid,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userId) => dispatch(updateUser(userId))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'users' }
  ])
)(UpdateUser)
