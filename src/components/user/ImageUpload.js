import React, { Component } from 'react'

class ImageUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      url: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      const { image } = this.state
      this.setState({ image })
    }
  }

  render() {
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
    return (
      <div style={style}>
        <input type="file" onChange={this.handleChange} />
        <button>Upload</button>
      </div>
    )
  }
}

export default ImageUpload