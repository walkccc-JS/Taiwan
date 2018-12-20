import React from 'react'

const SignedOutButtons = () => {
  return (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <a href="/signup" className="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a href="/signin" className="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  )
}

export default SignedOutButtons