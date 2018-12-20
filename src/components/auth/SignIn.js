import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../store/actions/authActions'

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.signIn(this.state)
  }

  render() {
    const { auth, authError } = this.props
    if (auth.uid) return <Redirect to ='/' />

    return (
      <section className="section">
        <div className="container grid" style={{maxWidth: 1024}}>

          <div className="title">
            Sign In
          </div>

          <form onSubmit={this.handleSubmit} >

            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="email" id="email" placeholder="Email input" onChange={this.handleChange} />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="password" id="password" placeholder="Email input" onChange={this.handleChange} />
                <span className="icon is-small is-left">
                  <i className="fas fa-key"></i>
                </span>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Submit</button>
              </div>
              <div className="control">
                <button className="button is-text">Cancel</button>
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
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
