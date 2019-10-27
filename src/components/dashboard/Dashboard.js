import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import PostList from '../posts/PostList';

class Dashboard extends Component {
  render() {
    const { posts, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <section className="section is-paddingless-horizontal">
        <div className="container grid">
          <PostList posts={posts} />
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.firestore.ordered.posts,
    notifications: state.firestore.ordered.notifications,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'posts', orderBy: ['createdAt', 'desc'] },
    { collection: 'notifications', limit: 5, orderBy: ['time', 'desc'] }
  ])
)(Dashboard);
