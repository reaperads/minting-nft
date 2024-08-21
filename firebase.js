// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJpj15b4GQbBah8s_0VK1w1BqYwePQjEc",
  authDomain: "stress-capital.firebaseapp.com",
  projectId: "stress-capital",
  storageBucket: "stress-capital.appspot.com",
  messagingSenderId: "738250592770",
  appId: "1:738250592770:web:1b77f8157e67418a8a8d1b",
  measurementId: "G-ELRT4BQF2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);