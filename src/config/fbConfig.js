import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDLHLfxLF4GuZZjRxKvtZ1Lfig9d1rOs54",
  authDomain: "taiwan-cb56d.firebaseapp.com",
  databaseURL: "https://taiwan-cb56d.firebaseio.com",
  projectId: "taiwan-cb56d",
  storageBucket: "",
  messagingSenderId: "163307892861"
}
firebase.initializeApp(config)
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase