const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const createNotification = (notification => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc))
})

exports.addPost = functions.firestore
  .document('posts/{pid}')
  .onCreate(snap => {
    const post = snap.data()
    const notification = {
      content: `Added '${post.title}'`,
      user: `${post.authorFirstName} ${post.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification)
})

exports.updatePost = functions.firestore
  .document('posts/{pid}')
  .onUpdate(snap => {
    const post = snap.data()
    const notification = {
      content: `Updated '${post.title}'`,
      user: `${post.authorFirstName} ${post.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification)
})

exports.deletePost = functions.firestore
  .document('posts/{pid}')
  .onDelete(snap => {
    const post = snap.data()
    const notification = {
      content: `Deleted '${post.title}'`,
      user: `${post.authorFirstName} ${post.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification)
})

exports.userJoined = functions.auth.user()
  .onCreate(user => {
    return admin.firestore().collection('users')
      .doc(user.uid)
      .get()
      .then(snap => {
        const newUser = snap.data()
        const notification = {
          content: 'Joined the party',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification)
      })
})