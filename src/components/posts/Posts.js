import React, { Component } from 'react'
import PostList from '../posts/PostList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Posts extends Component {
  render() {
    const { posts, auth } = this.props
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <PostList posts={posts} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    posts: state.firestore.ordered.posts,
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    const uid = props.match.params.uid
    return (
      [
        { 
          collection: 'posts',
          // orderBy: ['createdAt', 'desc'],
          where: ['authorId', '==', uid],
        }
      ]
    )
  })
)(Posts)
