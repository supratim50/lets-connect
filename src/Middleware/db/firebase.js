import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDPzqBUw5Jtz3mPEVDevXZeCkIrypDoT5w",
  authDomain: "lets-connect-68644.firebaseapp.com",
  projectId: "lets-connect-68644",
  storageBucket: "lets-connect-68644.appspot.com",
  messagingSenderId: "697658230806",
  appId: "1:697658230806:web:51ba90fac5beafc3afcd37"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);