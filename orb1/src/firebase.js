// cannot put firebase here

// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {} from 'firebase/firestore';
import firebase from "firebase/app";
import "firebase/auth";
import * as firebase from 'firebase';
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { Firestore } from "@google-cloud/firestore";


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyC_SyZezplGnJqMLfuYCjt69y_wiYZXmsU",
  authDomain: "trippin-out-4b976.firebaseapp.com",
  databaseURL: "https://trippin-out-4b976-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trippin-out-4b976",
  storageBucket: "trippin-out-4b976.appspot.com",
  messagingSenderId: "647184431594",
  appId: "1:647184431594:web:d69a768cadd176075c9a93",
  measurementId: "G-Y5RFEGS41E"
});


const app = getFirestore();

// const analytics = getAnalytics(app);
// export const firestore = getFirestore(app);

// export const provider = new GoogleAuthProvider();
// export const auth = getAuth(app);
// export const storage = getStorage();

// export const firebase = app;
