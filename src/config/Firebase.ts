import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiH8J14Ta3KSg-V2U0T6ZGRvkhvn2fuR8",
  authDomain: "news-app-ef37b.firebaseapp.com",
  projectId: "news-app-ef37b",
  storageBucket: "news-app-ef37b.appspot.com",
  messagingSenderId: "1060713471627",
  appId: "1:1060713471627:web:3c215579f2a883eda83e8e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
