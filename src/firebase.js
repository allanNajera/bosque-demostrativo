import firebase from "firebase"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyAoambh-O1d2iJk1jvAiYink8sThRUo9vs",
  authDomain: "bosquedemostrativooccidente.firebaseapp.com",
  projectId: "bosquedemostrativooccidente",
  storageBucket: "bosquedemostrativooccidente.appspot.com",
  messagingSenderId: "957666752814",
  appId: "1:957666752814:web:397ede9cb60b6b7b28a2bf",
  measurementId: "${config.measurementId}"
})

export const auth = app.auth()

const db = firebase.firestore();

const storage = firebase.storage();

  const storageRef = storage.ref();

export {db,storage,storageRef };

export default app
