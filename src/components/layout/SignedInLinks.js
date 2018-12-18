import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  const { profile } = props
  return (
    <ul>
      <li>
        <a href={'/' + profile.id} className="black-text">
          Hi, {profile.id}
        </a>
      </li>
      <li><a href='/create' className="black-text">New Post</a></li>
      <li><a href='/' onClick={props.signOut} className="black-text">Log out</a></li>
      <li><Link to={'/edit/' + profile.id} className="black-text">Edit account</Link></li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)