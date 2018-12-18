import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCN4hrRAzDBDN5owsvIa0qT8cbIuoGrpeE",
  authDomain: "taiwan-blog.firebaseapp.com",
  databaseURL: "https://taiwan-blog.firebaseio.com",
  projectId: "taiwan-blog",
  storageBucket: "taiwan-blog.appspot.com",
  messagingSenderId: "991703831869"
}
firebase.initializeApp(config)
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase