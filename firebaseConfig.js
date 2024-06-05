import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc, query, where } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgvBMf6gMcVJLRd-sNrH5jKQVbtcLl1lY",
  authDomain: "ngcoinsdb.firebaseapp.com",
  projectId: "ngcoinsdb",
  storageBucket: "ngcoinsdb.appspot.com",
  messagingSenderId: "432636191445",
  appId: "1:432636191445:web:9d8a9da9c8f2364112b85c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db, collection, getDocs, deleteDoc, doc, addDoc, query, where, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };