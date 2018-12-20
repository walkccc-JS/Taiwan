import React from 'react'
import { Link } from 'react-router-dom'

const SignedInButtons = (props) => {
  const { profile } = props

  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <Link to="#" className="navbar-link">
        More
      </Link>

      <div className="navbar-dropdown">
        <a href={'/' + profile.id} className="navbar-item">
          Profile
        </a>
        <Link to={'/edit/' + profile.id} className="navbar-item">
          Edit Account
        </Link>
        <hr className="navbar-divider" />
        <a href='/create' className="navbar-item">
          New Post
        </a>
      </div>
    </div>
  )
}

export default SignedInButtons
