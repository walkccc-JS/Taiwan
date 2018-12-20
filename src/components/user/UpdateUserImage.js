import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { updateUserImage } from '../../store/actions/authActions'
import { storage } from '../../config/fbConfig'
import './UpdateUserImage.css'
// import './debug.css'

class UpdateUserImage extends Component {
  componentDidMount() {
    console.log("Upload Initialised");
    const fileSelect   = document.getElementById('file-upload');

    fileSelect.addEventListener('change', (e) => {
      const files = e.target.files || e.dataTransfer.files;
    
      if (e.target.files[0]) {
        const image = e.target.files[0]
        this.setState({ image })
      }

      fileDragHover(e);
      parseFile(files[0])
      // for (let i = 0, f; f = files[i]; i++) {
      //   parseFile(f);
      // }
    }, false);

    function fileDragHover(e) {
      var fileDrag = document.getElementById('file-drag');
      e.stopPropagation();
      e.preventDefault();
      fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
    }

    function parseFile(file) {
      // console.log(file.name);
      output('<strong>' + encodeURI(file.name) + '</strong>');
      
      var imageName = file.name;

      var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
      if (isGood) {
        document.getElementById('start').classList.add("hidden");
        document.getElementById('response').classList.remove("hidden");
        document.getElementById('notimage').classList.add("hidden");
        document.getElementById('file-image').classList.remove("hidden");
        document.getElementById('file-image').src = URL.createObjectURL(file);
      } else {
        document.getElementById('file-image').classList.add("hidden");
        document.getElementById('notimage').classList.remove("hidden");
        document.getElementById('start').classList.remove("hidden");
        document.getElementById('response').classList.add("hidden");
        document.getElementById("file-upload-form").reset();
      }
    }

    function output(msg) {
      const m = document.getElementById('messages');
      m.innerHTML = msg;
    }
  }

  state = {
    image: '',
    url: '',
    progress: 0,
    message: ''
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
        .finally(() => {
          this.setState({ message: 'done' })
        })
      }
    )
  }

  render() {
    // console.log(this.state.progress)
    const { user, profile } = this.props
    if (user && user.email !== profile.email) return <Redirect to ={'/' + user.id} />

    return (
      <section className="section">
        <div className="container grid" style={{maxWidth: 1024}}>

          <div className="center"><h2>Update your avatar!</h2></div>

          <form id="file-upload-form" className="uploader">
            <input id="file-upload" type="file" name="fileUpload" accept="image/*" onChange={this.handleChange} />
            <label htmlFor="file-upload" id="file-drag" style={{marginTop: 15, marginBottom: 15}}>

              <img id="file-image" src="#" alt="Preview" className="hidden" />
              
              <div id="start">
                <i className="fa fa-download" aria-hidden="true"></i>
                <div>Select a file or drag here</div>
                <div id="notimage" className="hidden">Please select an image</div>
                <span id="file-upload-btn" className="btn btn-primary">Select a file</span>
              </div>
              
              <div id="response" className="hidden">
                <div id="messages"></div>
                <progress value={this.state.progress} max="100" />
              </div>
            </label>
          </form>

          <div className="center">
            <button className="button is-primary" onClick={this.handleUpload} style={{marginBottom: 15}}>Upload</button>
          </div>

          { this.state.message ?
            <div className="center">

              <Link to={'/' + user.id} className="button is-success">
                <span className="icon is-small">
                  <i className="far fa-grin-alt"></i>
                </span>
                <strong>done</strong>
              </Link>

            </div>
          : null }

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