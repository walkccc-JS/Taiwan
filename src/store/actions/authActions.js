export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const fb = getFirebase()
    const db = getFirestore()

    fb.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then(res => {
      return db.collection('users').doc(res.user.uid).set({
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        initials: newUser.firstName[0] + newUser.lastName[0]
      })
    })
    .then(dispatch({ type: 'SIGNUP' }))
    .catch(err => dispatch({ type: 'SIGNUP_ERROR' ,err }))
  }
}

export const signIn = (creds) => {
  return (dispatch, getState, { getFirebase }) => {
    const fb = getFirebase()

    fb.auth().signInWithEmailAndPassword(creds.email, creds.password)
    .then(dispatch({ type: 'SIGNIN' }))
    .catch(err => dispatch({ type: 'SIGNIN_ERROR', err }))
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const fb = getFirebase()

    fb.auth().signOut().then(dispatch({ type: 'SIGNOUT' }))
  }
}

export const updateUser = (user) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const fb = getFirebase()
    const currentUser = fb.auth().currentUser
    const profile = getState().firebase.profile

    console.log(user)
    console.log(profile)

    if (user.email !== profile.email) {
      currentUser.updateEmail(user.email)
      .then(dispatch({ type: 'UPDATE_EMAIL' }))
      .catch(err => dispatch({ type: 'UPDATE_EMAIL_ERROR', err }))
    }

    if (user.password !== profile.password) {
      currentUser.updatePassword(user.password)
      .then(dispatch({ type: 'UPDATE_PASSWORD' }))
      .catch(err => dispatch({ type: 'UPDATE_PASSWORD_ERROR', err }))
    }

    const db = getFirestore()
    db.collection('users').doc(user.uid).update({
      ...user,
      initials: user.firstName[0] + user.lastName[0]
    })
    .then(dispatch({ type: 'UPDATE_USER', user }))
    .catch(err => dispatch({ type: 'UPDATE_USER_ERROR', err }))

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