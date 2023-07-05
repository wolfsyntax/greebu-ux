import { initializeApp } from "firebase/app"
import { getFirestore, collection } from 'firebase/firestore'
import 'firebase/database';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBXtNf-rupi7DheKW_s_gqdwAKTQ1ygPLE",
  authDomain: "khq-vue-tutorial.firebaseapp.com",
  projectId: "khq-vue-tutorial",
  storageBucket: "khq-vue-tutorial.appspot.com",
  messagingSenderId: "793965647816",
  appId: "1:793965647816:web:2c9edded419cdb44de12fd"
}



export const firebaseApp = initializeApp(firebaseConfig)

// use for the firestore ref
const db = getFirestore(firebaseApp)

// here we  can export reusable database references
export const todoRef = collection(db, 'todos');
