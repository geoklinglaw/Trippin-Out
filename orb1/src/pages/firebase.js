// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_SyZezplGnJqMLfuYCjt69y_wiYZXmsU",
  authDomain: "trippin-out-4b976.firebaseapp.com",
  projectId: "trippin-out-4b976",
  storageBucket: "trippin-out-4b976.appspot.com",
  messagingSenderId: "647184431594",
  appId: "1:647184431594:web:d69a768cadd176075c9a93",
  measurementId: "G-Y5RFEGS41E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const storage = getStorage();