// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

import { getFirestore, collection, getDocs } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGlW2DqEr1yxEmW1492vDa6xYHPR-0LH4",
  authDomain: "compact-coach-ex.firebaseapp.com",
  projectId: "compact-coach-ex",
  storageBucket: "compact-coach-ex.appspot.com",
  messagingSenderId: "303225431212",
  appId: "1:303225431212:web:bc342df7b17736d583ab09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export {auth,db,storage};