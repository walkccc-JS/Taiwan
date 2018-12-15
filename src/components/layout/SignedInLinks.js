import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
    <ul>
      <li>
        <a href={'/user/' + props.profile.id} className="black-text">
          Hi, {props.profile.id}
        </a>
      </li>
      <li><a href='/create' className="black-text">New Post</a></li>
      <li><a href='/' onClick={props.signOut} className="black-text">Log out</a></li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)