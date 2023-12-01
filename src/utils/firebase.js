// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYEjLnqJHn61B5dn3RVBpLaCgMPfbC0tE",
  authDomain: "netflixgpt-bb3f0.firebaseapp.com",
  projectId: "netflixgpt-bb3f0",
  storageBucket: "netflixgpt-bb3f0.appspot.com",
  messagingSenderId: "400374433731",
  appId: "1:400374433731:web:2f287948e6e49f5e875f76",
  measurementId: "G-50N201G9MZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();