import React from 'react'

const SignedOutLinks = () => {
  return (
    <ul>
      <li><a className="black-text" href='/signup'>Signup</a></li>
      <li><a className="black-text" href='/signin'>Login</a></li>
    </ul>
  )
}

export default SignedOutLinks