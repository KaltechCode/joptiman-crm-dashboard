// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjcl2WxnBq8E9z4S-I5r-A-4w3azjfT4o",
  authDomain: "joptiman-crm.firebaseapp.com",
  projectId: "joptiman-crm",
  storageBucket: "joptiman-crm.appspot.com",
  messagingSenderId: "715323471273",
  appId: "1:715323471273:web:783ebfadaf5255a35d80b8",
  measurementId: "G-GQVDBTBGXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const storage = getStorage();
export const fdb = getFirestore();

export function GetDatabaseVal(con) {
  console.log("In DB FUNCTION")
  const db = getDatabase();
  const starCountRef = ref(db, 'messages/' + con);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data, "dtaa")
  })
}