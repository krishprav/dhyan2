// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI40myiuLk7OVxPmshUhvOHjkSpWHf6mM",
  authDomain: "dhyanapp-90de4.firebaseapp.com",
  databaseURL: "https://dhyanapp-90de4-default-rtdb.firebaseio.com",
  projectId: "dhyanapp-90de4",
  storageBucket: "dhyanapp-90de4.appspot.com",
  messagingSenderId: "667182752134",
  appId: "1:667182752134:web:e6ba3978d78eb7e8118c07",
  measurementId: "G-XC26S5F391"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore }; 