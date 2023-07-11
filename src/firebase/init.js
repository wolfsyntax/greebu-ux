import { initializeApp } from "firebase/app"
import { getFirestore, collection } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import 'firebase/database';
import 'firebase/messaging';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

export const firebaseApp = initializeApp(firebaseConfig)
export const analytics = getAnalytics(firebaseApp);

export const auth = getAuth()
// use for the firestore ref
const db = getFirestore(firebaseApp)

// here we  can export reusable database references
export const todoRef = collection(db, 'todos');
