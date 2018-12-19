import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../store/actions/authActions'
// import './SignIn.css'

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
      <div className="row form-design z-depth-0">
        <div className="col s12 l6 offset-l3">
          <div className="card">
            
            <form onSubmit={this.handleSubmit} className="white">
              <div className="card-action white">
                <h3 className="center">Sign In</h3>
              </div>

              <div className="card-content">

                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" onChange={this.handleChange} />
                </div><br />

                <div className="form-field">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" onChange={this.handleChange} />
                </div><br />

                <div className="form-field center-align">
                  <button className="btn green z-depth-0">Sign In</button>
                  <div className="red-text center">
                    { authError ? <p>{ authError }</p> : null }
                  </div>
                </div><br />
              
              </div>
            </form>

          </div>
        </div>
      </div>
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
