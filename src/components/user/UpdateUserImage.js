import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { updateUserImage } from '../../store/actions/authActions'
import { storage } from '../../config/fbConfig'

class UpdateUserImage extends Component {
  state = {
    image: '',
    url: '',
    progress: 0
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      this.setState({ image })
    }
  }

  handleUpload = (e) => {
    e.preventDefault()
    const { image } = this.state
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        this.setState({ progress })
      },
      (err) => {
        console.log(err)
      },
      () => {
        storage.ref('images').child(image.name).getDownloadURL()
        .then(url => {
          this.setState({ url })
          this.props.updateUserImage(url)
        })
      }
    )
  }

  render() {
    const { user, profile } = this.props
    if (user && user.email !== profile.email) return <Redirect to ={'/' + user.id} />
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
    return (
      <section className="section">
        <div className="container grid" style={{maxWidth: 1024}}>

          <progress value={this.state.progress} max="100" />
          <input type="file" onChange={this.handleChange} />
          <button className="button" onClick={this.handleUpload}>Upload</button>
          <br />

          <figure>
            <span className="image is-128x128">
              <img src={this.state.url || 'https://via.placeholder.com/300x300'} alt="avatar"/>
            </span>
          </figure>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  const users = state.firestore.ordered.users
  const user = users ? users[0] : null

  return {
    user: user,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserImage: (imageURL) => dispatch(updateUserImage(imageURL))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    const id = props.match.params.id
    return (
      [
        { collection: 'users', where: ['id', '==', id] }
      ]
    )
  })
)(UpdateUserImage)