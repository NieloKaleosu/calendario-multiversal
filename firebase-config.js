
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDkHZeIapqIme4QrVFHaWerBex7JtdRF1o",
  authDomain: "calendario-multiversal.firebaseapp.com",
  databaseURL: "https://calendario-multiversal-default-rtdb.firebaseio.com",
  projectId: "calendario-multiversal",
  storageBucket: "calendario-multiversal.firebasestorage.app",
  messagingSenderId: "123383358802",
  appId: "1:123383358802:web:58095a5d2efcee22ed468b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
