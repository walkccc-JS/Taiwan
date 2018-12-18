export const signUp = (user) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const fb = getFirebase()
    const db = getFirestore()

    fb.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
      return db.collection('users').doc(res.user.uid).set({
        ...user,
        initials: user.firstName[0] + user.lastName[0]
      })
    })
    .then(dispatch({ type: 'SIGNUP' }))
    .catch(err => dispatch({ type: 'SIGNUP_ERR' ,err }))
  }
}

export const signIn = (creds) => {
  return (dispatch, getState, { getFirebase }) => {
    const fb = getFirebase()

    fb.auth().signInWithEmailAndPassword(creds.email, creds.password)
    .then(dispatch({ type: 'SIGNIN' }))
    .catch(err => dispatch({ type: 'SIGNIN_ERR', err }))
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const fb = getFirebase()

    fb.auth().signOut()
    .then(dispatch({ type: 'SIGNOUT' }))
    .catch(err => dispatch({ type: 'SIGNOUT_ERR', err }))
  }
}

export const updateUser = (user) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const fb = getFirebase()
    const currentUser = fb.auth().currentUser
    const profile = getState().firebase.profile

    if (user.email !== profile.email) {
      currentUser.updateEmail(user.email)
      .then(dispatch({ type: 'UPDATE_EMAIL' }))
      .catch(err => dispatch({ type: 'UPDATE_EMAIL_ERR', err }))
    }

    if (user.password !== profile.password) {
      currentUser.updatePassword(user.password)
      .then(dispatch({ type: 'UPDATE_PASSWORD' }))
      .catch(err => dispatch({ type: 'UPDATE_PASSWORD_ERR', err }))
    }

    const db = getFirestore()
    db.collection('users').doc(currentUser.uid).update({
      ...user,
      initials: user.firstName[0] + user.lastName[0]
    })
    .then(dispatch({ type: 'UPDATE_USER', user }))
    .catch(err => dispatch({ type: 'UPDATE_USER_ERR', err }))

    db.collection('posts').where('authorId', '==', profile.id)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        db.collection('posts').doc(doc.id).update({
          authorFirstName: user.firstName,
          authorLastName: user.lastName,
          authorId: user.id, 
        })
      })
    })
  }
}

export const deleteUser = (uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const fb = getFirebase()
    const db = getFirestore()
    const currentUser = fb.auth().currentUser

    currentUser.delete()
    .then(dispatch({ type: 'DELETE_USER_AUTH ' }))
    .catch(err => dispatch({ type: 'DELETE_USER_AUTH_ERR '}, err))

    db.collection('users').doc(uid).delete()
    .then(dispatch({ type: 'DELETE_USER', uid }))
    .catch(err => dispatch({ type: 'DELETE_USER_ERR', err }))

    db.collection('posts').where('authorUid', '==', uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        db.collection('posts').doc(doc.id).delete()
      })
    })
  }
}