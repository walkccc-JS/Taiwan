import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
  state = {
    id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    img: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.signUp(this.state)
  }

  render() {
    const { auth, authError } = this.props
    if (auth.uid) return <Redirect to ='/' />

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
                <input className="input" type="id" id="id" placeholder="taiwanisgood" onChange={this.handleChange} />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="email" id="email" placeholder="taiwan@gmail.com" onChange={this.handleChange} />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="password" id="password" placeholder="at least 6-degit" onChange={this.handleChange} />
                <span className="icon is-small is-left">
                  <i className="fas fa-key"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">First Name</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="text" id="firstName" placeholder="Taiwan" onChange={this.handleChange} />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Last Name</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="text" id="lastName" placeholder="Taipei" onChange={this.handleChange} />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Avatar Url (Beta)</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="text" id="img" placeholder="https://imgur.com/x2PnWvZ.png" onChange={this.handleChange} />
                <span className="icon is-small is-left">
                  <i className="fas fa-image"></i>
                </span>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Submit</button>
              </div>
              <div className="control">
                <Link to ="/signin" className="button is-primary">
                  <strong>Log in</strong>
                </Link>
              </div>
            </div>

            <div className="red-text center">
              { authError ? <p>{ authError }</p> : null }
            </div>

          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
