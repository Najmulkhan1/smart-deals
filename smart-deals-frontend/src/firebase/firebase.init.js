// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY6SIV98ZkV1f1JJV0v8YSbmz8km7K_gY",
  authDomain: "smart-deals-816a0.firebaseapp.com",
  projectId: "smart-deals-816a0",
  storageBucket: "smart-deals-816a0.firebasestorage.app",
  messagingSenderId: "740331820117",
  appId: "1:740331820117:web:d393952ce322bd4b41f0dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);