// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//! Authentication
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn5JbwXY6AbrXJMGamci2jamSSI5sV4-I",
  authDomain: "chat-app-18c50.firebaseapp.com",
  projectId: "chat-app-18c50",
  storageBucket: "chat-app-18c50.firebasestorage.app",
  messagingSenderId: "70892262690",
  appId: "1:70892262690:web:793fe3aeaef052c6dcc17b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//! Authentication referansını frontende alma(kurul)
export const auth = getAuth(app);

//! Google sağlayıcısını kurma
export const provider = new GoogleAuthProvider();

//! Firestore referansını frontende alma(kurul)
export const db = getFirestore(app);
