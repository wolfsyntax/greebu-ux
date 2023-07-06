import { initializeApp } from "firebase/app"
import { getFirestore, collection } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import 'firebase/database';
import 'firebase/messaging';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBcIRQA-Cctt6-D202JlYLwda4V74j-PxE",
  authDomain: "greebux.firebaseapp.com",
  projectId: "greebux",
  storageBucket: "greebux.appspot.com",
  messagingSenderId: "659950834603",
  appId: "1:659950834603:web:2c0c1fb0d6117f371178ee",
  measurementId: "G-DC2FY0N3CY",
}



export const firebaseApp = initializeApp(firebaseConfig)
export const analytics = getAnalytics(firebaseApp);

export const auth = getAuth()
// use for the firestore ref
const db = getFirestore(firebaseApp)

// here we  can export reusable database references
export const todoRef = collection(db, 'todos');
