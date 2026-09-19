import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, update, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfMv6N5vLJNQv5vtl8ikFxCEFWu6sYpAk",
  authDomain: "euawedding-b7606.firebaseapp.com",
  projectId: "euawedding-b7606",
  databaseURL: "https://euawedding-b7606-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "euawedding-b7606.appspot.com",
  messagingSenderId: "1095494718647",
  appId: "1:1095494718647:web:15c97daa4e7e5b5d272932"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export { ref, push, onValue, update, remove };
export default app;