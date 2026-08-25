import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfcRc-iIDiHiquHjDCRb-3eSKAu1hieVc",
  authDomain: "event-manager-6009e.firebaseapp.com",
  projectId: "event-manager-6009e",
  storageBucket: "event-manager-6009e.firebasestorage.app",
  messagingSenderId: "85588710429",
  appId: "1:85588710429:web:99f39ae0ec35c9b24462f4",
  measurementId: "G-G3G0S9RWG3",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };
