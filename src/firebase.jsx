// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuPzFeJjtmoVpl7GzssIVkQ_1acPS7L_Y",
  authDomain: "hotelmanagement-17b13.firebaseapp.com",
  projectId: "hotelmanagement-17b13",
  storageBucket: "hotelmanagement-17b13.appspot.com",
  messagingSenderId: "722736864147",
  appId: "1:722736864147:web:b6b8c6d87fd906eb00e666",
  measurementId: "G-QNBR7TZQ16"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const analytics = getAnalytics(app);