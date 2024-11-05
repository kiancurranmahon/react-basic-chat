import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Initialize Firebase with your credentials
firebase.initializeApp({
  apiKey: "AIzaSyD1rzcF-bWyhPYQLDnM288koXTdRLbCoow",
  authDomain: "samplechat-68538.firebaseapp.com",
  projectId: "samplechat-68538",
  storageBucket: "samplechat-68538.appspot.com",
  messagingSenderId: "321463709349",
  appId: "1:321463709349:web:b7deea3175671c01d4274c",
  measurementId: "G-ZELJNKN9T9",
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
