import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import PostList from '../posts/PostList'

class Posts extends Component {
  render() {
    const { uid, posts } = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <PostList uid={uid} posts={posts} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const uid = props.match.params.uid
  return {
    uid: uid,
    posts: state.firestore.ordered.posts
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
