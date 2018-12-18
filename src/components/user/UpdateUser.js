import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { updateUser } from '../../store/actions/authActions'

class UpdateUser extends Component {
  state = {
    id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''    
  }

  componentDidMount() {
    const { user } = this.props
    if (user) this.setState({
      ...user
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.updateUser(this.state)
    this.props.history.push('/' + this.state.id)
  }

  render() {
    const { user, profile } = this.props
    if (user && user.email !== profile.email) return <Redirect to ={'/' + user.id} />

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

const mapStateToProps = (state) => {
  const users = state.firestore.ordered.users
  const user = users ? users[0] : null

  return {
    user: user,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    const uid = props.match.params.uid
    return (
      [
        { collection: 'users', where: ['id', '==', uid] }
      ]
    )
  })
)(UpdateUser)
