import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQxW7eyrlQO-qd_CBRZwHCDXZPRrOVC6U",
  authDomain: "hacksbazaar-8a586.firebaseapp.com",
  projectId: "hacksbazaar-8a586",
  storageBucket: "hacksbazaar-8a586.appspot.com",
  messagingSenderId: "959780899077",
  appId: "1:959780899077:web:6a4093e7d088b110db4f6c",
  measurementId: "G-HLRRERBBCP"
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

export { firebaseAuth }