// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpntWPNA1FQh3EciPGiM_HOX6RoLVfEpI",
  authDomain: "signal-9796d.firebaseapp.com",
  projectId: "signal-9796d",
  storageBucket: "signal-9796d.appspot.com",
  messagingSenderId: "37563928802",
  appId: "1:37563928802:web:721196b961b03437f48ebb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth(app)

export{db,auth}