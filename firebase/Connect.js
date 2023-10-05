// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlRQqAUqip2MRJ-TSUJe5zHXw-A6w48ow",
  authDomain: "runningtracking-8ba2f.firebaseapp.com",
  projectId: "runningtracking-8ba2f",
  storageBucket: "runningtracking-8ba2f.appspot.com",
  messagingSenderId: "320973317159",
  appId: "1:320973317159:web:f7f0576ec357193f409a02",
  measurementId: "G-N4HJ0RHC8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;