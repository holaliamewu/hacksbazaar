import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAQxW7eyrlQO-qd_CBRZwHCDXZPRrOVC6U",
  authDomain: "hacksbazaar-8a586.firebaseapp.com",
  projectId: "hacksbazaar-8a586",
  storageBucket: "hacksbazaar-8a586.appspot.com",
  messagingSenderId: "959780899077",
  appId: "1:959780899077:web:6a4093e7d088b110db4f6c",
  measurementId: "G-HLRRERBBCP",
  databaseURL: "https://hacksbazaar-8a586-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const database = getDatabase(app);



export { firebaseAuth, database }