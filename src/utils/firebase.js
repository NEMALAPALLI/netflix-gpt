// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYQo-tI6IB_Nloh4bmsxaGnHn6OyvCWJU",
  authDomain: "netflix-gpt-5a358.firebaseapp.com",
  projectId: "netflix-gpt-5a358",
  storageBucket: "netflix-gpt-5a358.appspot.com",
  messagingSenderId: "290178942680",
  appId: "1:290178942680:web:2e2266e48cff59f5d2b9ad",
  measurementId: "G-FCC8C630NY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();