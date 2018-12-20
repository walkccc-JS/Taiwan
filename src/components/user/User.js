import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { deleteUser } from '../../store/actions/authActions'
import PostList from '../posts/PostList'
import Loading from '../layout/Loading'
import './User.css'
// import './debug.css'

class User extends Component {
  handleDelete = (e) => {
    const { uid } = this.props.auth
    this.props.deleteUser(uid)
    this.props.history.push('/') 
  }
  
  render() {
    const { profile, user, posts } = this.props
    // console.log(user)

    if (user) {
      return (
        <div>
          <section className="section">
            <div className="container grid" style={{maxWidth: 1024}}>
              <article className="media center">
                <figure className="media-left">
                  <span className="image is-64x64">
                    { user.img ? 
                    <img src={user.img} alt="avatar" />
                    : <img src="https://imgur.com/PfpPTaf.jpg" alt="avatar" /> }
                  </span>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>{user.firstName} {user.lastName}</strong> <a href={'/' + user.id}>@{user.id}</a><br />
                      <span><i className="fas fa-envelope"></i> {user.email}<br /></span>

                      { user.email === profile.email ?
                      <Link to="/" onClick={this.handleDelete} className="has-text-danger">
                        <strong>Delete all! (BETA)</strong>
                      </Link>
                      : null }

                    </p>
                  </div>
                </div>

                { user.email === profile.email ? 
                <div>
                  <Link to={'/edit/' + user.id} user={user} className="button">
                    <span className="icon is-small">
                      <i className="fas fa-edit"></i>
                    </span>
                  </Link>
                </div>
                : null }

              </article>
            </div>
          </section>
          <section className="section is-paddingless-horizontal">
            <div className="container grid">
              <PostList posts={posts} />
            </div>
          </section>
        </div>
      )
    } else {
      return (
        <Loading />
      )
    }
  }
}

const mapStateToProps = (state) => {
  const users = state.firestore.ordered.users
  const user = users ? users[0] : null

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    user: user,
    posts: state.firestore.ordered.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (uid) => dispatch(deleteUser(uid))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    const id = props.match.params.id
    return (
      [
        { collection: 'users', where: ['id', '==', id] },
        { 
          collection: 'posts',
          // orderBy: ['createdAt', 'desc'],
          where: ['authorId', '==', id],
        }
      ]
    )
  })
)(User)
