import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

class SignedInButtons extends Component {
  render() {
    return (
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a
              href="/"
              onClick={this.props.signOut}
              className="button is-primary"
            >
              <strong>Log out</strong>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInButtons);
