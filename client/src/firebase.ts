// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "regal-estate-9d0cb.firebaseapp.com",
  projectId: "regal-estate-9d0cb",
  storageBucket: "regal-estate-9d0cb.appspot.com",
  messagingSenderId: "848709742806",
  appId: "1:848709742806:web:de878bfa7e4d3bcdce5977",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
