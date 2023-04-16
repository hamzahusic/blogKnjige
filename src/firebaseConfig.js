// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqkcwQ1jOG1njmTmfrExpnS1z-74NfXvA",
  authDomain: "knjige-blog.firebaseapp.com",
  projectId: "knjige-blog",
  storageBucket: "knjige-blog.appspot.com",
  messagingSenderId: "654468295557",
  appId: "1:654468295557:web:e41dcdc01ed178b9c832ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);