export const createPost = (post) => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore()
    const profile = getState().firebase.profile
    const authorId = getState().firebase.auth.uid

    firestore.collection('posts').add({
      ...post,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_POST', post })
    }).catch(err => {
      dispatch({ type: 'CREATE_POST_ERROR', err })
    })
  }
}

export const deletePost = (postId) => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore()
    firestore.collection('posts').doc(postId).delete().then(() => {
      dispatch({ type: 'DELETE_POST', postId })
    }).catch(err => {
      dispatch({ type: 'DELETE_POST_ERROR', err })
    })
  }
}

export const updatePost = (post) => {
  return (dispatch, getState, { getFirestore }) => {
    // mask async call to database
    const firestore = getFirestore()
    firestore.collection('posts').doc(post.postId).update({
      title: post.title,
      content: post.content
    }).then(() => {
      dispatch({ type: 'UPDATE_POST', post })
    }).catch(err => { 
      dispatch({ type: 'UPDATE_POST_ERROR', err })
    })
  }
}