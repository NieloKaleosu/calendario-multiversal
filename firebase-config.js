
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDkHZeIapqIme4QrVFHaWerBex7JtdRF1o",
  authDomain: "calendario-multiversal.firebaseapp.com",
  databaseURL: "https://calendario-multiversal-default-rtdb.firebaseio.com",
  projectId: "calendario-multiversal",
  storageBucket: "calendario-multiversal.appspot.com",
  messagingSenderId: "123383358802",
  appId: "1:123383358802:web:58095a5d2efcee22ed468b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onValue, remove };
