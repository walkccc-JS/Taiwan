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
    lastName: '',
    img: ''
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
        <section className="section">
          <div className="container grid" style={{maxWidth: 1024}}>

            <div className="title">
              Sign Up
            </div>

            <form onSubmit={this.handleSubmit} >

              <div className="field">
                <label className="label"></label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input" type="id" id="id" placeholder="taiwanisgood" value={this.state.id} onChange={this.handleChange} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input" type="email" id="email" placeholder="taiwan@gmail.com" value={this.state.email} onChange={this.handleChange} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input" type="password" id="password" placeholder="at least 6-degit" value={this.state.password} onChange={this.handleChange} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">First Name</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input" type="text" id="firstName" placeholder="Taiwan" value={this.state.firstName} onChange={this.handleChange} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Last Name</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input" type="text" id="lastName" placeholder="Taipei" value={this.state.lastName} onChange={this.handleChange} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Avatar Url (Beta)</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input" type="text" id="img" placeholder="https://imgur.com/x2PnWvZ.png" value={this.state.img} onChange={this.handleChange} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-image"></i>
                  </span>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link">Update</button>
                </div>
                <div className="control">
                  <button className="button is-text">Cancel</button>
                </div>
              </div>

            </form>
          </div>
        </section>
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
    const id = props.match.params.id
    return (
      [
        { collection: 'users', where: ['id', '==', id] }
      ]
    )
  })
)(UpdateUser)
