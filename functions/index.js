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
      user: `${post.authorFirstName} ${post.authorLastName}`,
      action: 'added',
      title: post.title,
      authorId: post.authorId,
      url: snap.id,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification)
})

// exports.updatePost = functions.firestore
//   .document('posts/{pid}')
//   .onUpdate(change => {
//     console.log(change)
//     const post = change.after.data()
//     const notification = {
//       user: `${post.authorFirstName} ${post.authorLastName}`,
//       action: 'updated',
//       title: post.title,
//       authorId: post.authorId,
//       url: change.id,
//       time: admin.firestore.FieldValue.serverTimestamp()
//     }
//     return createNotification(notification)
// })

exports.deletePost = functions.firestore
  .document('posts/{pid}')
  .onDelete(snap => {
    const post = snap.data()
    const notification = {
      user: `${post.authorFirstName} ${post.authorLastName}`,
      action: 'deleted',
      title: post.title,
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
          user: `${newUser.firstName} ${newUser.lastName}`,
          action: 'joined the party',
          time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification)
      })
})