import React, { Component } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import Notifications from './Notifications'
import Taiwan from '../../img/taiwan.png'

class Navbar extends Component {
  componentDidMount() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav, {});

    const dropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdown, { constrainWidth: false });
  }

  render() {
    const { auth, profile, notifications } = this.props
    const links = auth.uid ?
      <SignedInLinks profile={profile} /> : 
      <SignedOutLinks />

    return (
      <div>
        <nav className="white nav-extended">
          <div className="nav-wrapper">
            <div className="container">

              <Link to='/' className="brand-logo black-text">
                <span><img src={Taiwan} alt="taiwan" height={26} /> Taiwan</span>
              </Link>
              <Link to='#' data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons black-text">menu</i>
              </Link>

              <ul id="nav-mobile" className="right hide-on-small-and-down">
                <Link to='#' className="dropdown-trigger btn-floating orange" data-target="dropdown1">
                  <i className="material-icons">notifications</i>
                </Link>

                <Link to='#' className="dropdown-trigger btn-floating indigo" data-target="dropdown2">
                  <i className="material-icons">account_circle</i>
                </Link>
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

        <ul className="dropdown-content" id="dropdown1">
          <Notifications notifications={notifications} />
        </ul>

        <ul className="dropdown-content" id="dropdown2">
          {links}
        </ul>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'notifications', limit: 5, orderBy: ['time', 'desc'] }
  ])
)(Navbar)
