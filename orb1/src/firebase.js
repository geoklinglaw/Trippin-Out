import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your configuration here
const firebaseConfig = {
  apiKey: "AIzaSyC_SyZezplGnJqMLfuYCjt69y_wiYZXmsU",
  authDomain: "trippin-out-4b976.firebaseapp.com",
  databaseURL: "https://trippin-out-4b976-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trippin-out-4b976",
  storageBucket: "trippin-out-4b976.appspot.com",
  messagingSenderId: "647184431594",
  appId: "1:647184431594:web:d69a768cadd176075c9a93",
  measurementId: "G-Y5RFEGS41E"
};

const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app);
const auth = getAuth(app);

export const db = getFirestore(app);
export {auth}
export const firebase = app;

// const analytics = getAnalytics(app);
// export const firestore = getFirestore(app);

// export const provider = new GoogleAuthProvider();
// export const auth = getAuth(app);
// export const storage = getStorage();

// export const firebase = app;