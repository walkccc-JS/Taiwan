import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addPost } from '../../store/actions/postActions';

class AddPost extends Component {
  state = {
    title: '',
    subtitle: '',
    content: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addPost(this.state);
    this.props.history.push('/');
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <section className="section">
        <div className="container grid" style={{ maxWidth: 1024 }}>
          <div className="title">New Post</div>

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Title</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  id="title"
                  placeholder="Taiwan is great!"
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="far fa-smile-beam"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Subitle</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  id="subtitle"
                  placeholder="Taiwan is beautiful!"
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-smile-wink"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Content</label>
              <div className="control">
                <textarea
                  className="textarea"
                  id="content"
                  placeholder="Taiwan is awesome!"
                  onChange={this.handleChange}
                ></textarea>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Submit</button>
              </div>
              <div className="control">
                <Link to="/" className="button is-text">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPost: post => dispatch(addPost(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost);
