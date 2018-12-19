import React, { Component } from 'react'
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
      <div className="row form-design z-depth-0">
        <div className="col s12 l6 offset-l3">
          <div className="card">
            
            <form onSubmit={this.handleSubmit} className="white">
              <div className="card-action white">
                <h3 className="center">Sign Up</h3>
              </div>

              <div className="card-content">

                <div className="form-field">
                  <label htmlFor="id">ID</label>
                  <input type="text" id="id" onChange={this.handleChange} />
                </div><br />

                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" onChange={this.handleChange} />
                </div><br />

                <div className="form-field">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" onChange={this.handleChange} />
                </div><br />

                <div className="form-field">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" onChange={this.handleChange} />
                </div><br />

                <div className="form-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" onChange={this.handleChange} />
                </div><br />

                <div className="form-field">
                  <label htmlFor="img">Avatar Url (Beta)</label>
                  <input type="text" id="img" onChange={this.handleChange} />
                </div><br />

                <div className="form-field center-align">
                  <button className="btn green z-depth-0">Sign Up</button>
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
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
