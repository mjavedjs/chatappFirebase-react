// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZENt0r7xeSH_4JeDZDZSxhMTcyE2YZJY",
  authDomain: "chatapp-94ac6.firebaseapp.com",
  projectId: "chatapp-94ac6",
  storageBucket: "chatapp-94ac6.firebasestorage.app",
  messagingSenderId: "555202368467",
  appId: "1:555202368467:web:6f4db7a2f0f239526d5526",
  measurementId: "G-1BZBK3Y6L0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db}