// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Auth
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
// Firestore
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "food-app-de365.firebaseapp.com",
  projectId: "food-app-de365",
  storageBucket: "food-app-de365.appspot.com",
  messagingSenderId: "24819287230",
  appId: "1:24819287230:web:a4f3426c7921cce8128aef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)

export const db = getFirestore(app);
export { auth };