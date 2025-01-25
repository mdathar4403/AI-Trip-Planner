// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from  "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6n6xWe6b05Jjhi-0E4UXTMwB8PPEG_Ks",
  authDomain: "trip-planner-athar.firebaseapp.com",
  projectId: "trip-planner-athar",
  storageBucket: "trip-planner-athar.firebasestorage.app",
  messagingSenderId: "21972602014",
  appId: "1:21972602014:web:884aee34efa7e274f77f8f",
  measurementId: "G-8WDMBW5YSQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);