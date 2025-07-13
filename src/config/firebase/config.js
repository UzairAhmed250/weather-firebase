// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyDF8vKRLnxZ2HbHcyRYnFmR3D_HEmQCCwM",
  authDomain: "weather-app-4d783.firebaseapp.com",
  projectId: "weather-app-4d783",
  storageBucket: "weather-app-4d783.firebasestorage.app",
  messagingSenderId: "754801590483",
  appId: "1:754801590483:web:35f656aac8f64521a1d426",
  measurementId: "G-E0VKLGZJ6M",
  databaseURL: "https://weather-app-4d783-default-rtdb.firebaseio.com/"
};

// const db = firebase.firestore();

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const analytics = getAnalytics(app);
export {firestore, collection, addDoc, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
export default app 
