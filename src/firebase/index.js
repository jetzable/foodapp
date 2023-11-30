// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Auth
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE6Jw12tWUn75F1OIeH6BpgmtNEw0zraY",
  authDomain: "food-app-de365.firebaseapp.com",
  projectId: "food-app-de365",
  storageBucket: "food-app-de365.appspot.com",
  messagingSenderId: "24819287230",
  appId: "1:24819287230:web:a4f3426c7921cce8128aef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };