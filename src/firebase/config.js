// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYKH-bKZfTgeXnfcWW4P7TwBpza8xdMZI",
  authDomain: "firestoredemo-1a45f.firebaseapp.com",
  databaseURL: "https://firestoredemo-1a45f.firebaseio.com",
  projectId: "firestoredemo-1a45f",
  storageBucket: "firestoredemo-1a45f.appspot.com",
  messagingSenderId: "498986789576",
  appId: "1:498986789576:web:fdff0225e7e7c42e0a53fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);