import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBsFIDqKLHU4GckPjXYzbctB2KGEFPtvC8",
  authDomain: "social-connect-7059c.firebaseapp.com",
  projectId: "social-connect-7059c",
  storageBucket: "social-connect-7059c.appspot.com",
  messagingSenderId: "515318271815",
  appId: "1:515318271815:web:04b559a45bfe1648288662"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);