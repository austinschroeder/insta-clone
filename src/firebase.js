import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBg8FdXbfMk3mz1dg2XZEMxjts15mztaas",
  authDomain: "insta-clone-9079b.firebaseapp.com",
  projectId: "insta-clone-9079b",
  storageBucket: "insta-clone-9079b.appspot.com",
  messagingSenderId: "325282114257",
  appId: "1:325282114257:web:e81c3d1cd998ddeb7333f0"
});



const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };