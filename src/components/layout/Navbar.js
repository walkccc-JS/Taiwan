import React, { Component } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

class Navbar extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  }

  render() {
    const { auth, profile } = this.props
    const links = auth.uid ?
      <SignedInLinks profile={profile} /> : 
      <SignedOutLinks />

    return (
      <div>
        <nav className="white nav-extended">
          <div className="nav-wrapper">
            <div className="container">
            <Link to='/' className="brand-logo black-text">Taiwan</Link>
            <a href='#' data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons black-text">menu</i>
            </a>            
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {links}
            </ul>
            </div>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
          <li><a href='/' className="black-text">
            <i className="material-icons black-text">home</i>
            Home
          </a></li>
          {links}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)