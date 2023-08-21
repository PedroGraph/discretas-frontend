// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXTHZV8NLfPAt-ljO3Cl_-a9RiJ1gt7iY",
  authDomain: "discreta-seduccion.firebaseapp.com",
  projectId: "discreta-seduccion",
  storageBucket: "discreta-seduccion.appspot.com",
  messagingSenderId: "54422796964",
  appId: "1:54422796964:web:839aa86873821aac91c431",
  measurementId: "G-TFQYPBTQLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);