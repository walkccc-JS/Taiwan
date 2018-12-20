import React, { Component } from 'react'
// import M from 'materialize-css/dist/js/materialize.min.js'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import SignedInButtons from './SignedInButtons'
import SignedInLinks from './SignedInLinks'
import SignedOutButtons from './SignedOutButtons'
// import Notifications from './Notifications'
import Taiwan from '../../img/taiwan.png'

class Navbar extends Component {
  componentDidMount() {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  }

  render() {
    const { auth, profile } = this.props
    const buttons = auth.uid ?
      <SignedInButtons /> : 
      <SignedOutButtons />
    
    const links = auth.uid ?
      <SignedInLinks profile={profile} /> :
      null

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            <img src={Taiwan} alt="Taiwan" width="28" height="28" />
            <span>Taiwan</span>
          </a>

          <Link to="#" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>

            { links }

          </div>
          { buttons }
        </div>
      </nav>   
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
