// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
const firebaseConfig = {
  apiKey: "AIzaSyCSiDW0-K0q9u3_zzfRunhW_bk7iLw2AnI",
  authDomain: "whatsapp-clone-69f49.firebaseapp.com",
  projectId: "whatsapp-clone-69f49",
  storageBucket: "whatsapp-clone-69f49.appspot.com",
  messagingSenderId: "160899253342",
  appId: "1:160899253342:web:458e12a18abd9ecec660cf",
  measurementId: "G-XXR8BG715Z"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);//creating an instance of the initialised App
const db = firebaseApp.firestore();
//instance of the database
const auth = firebase.auth();
//authentication instance
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider}; //exporting explicitly
export default db;
//exporting as default

