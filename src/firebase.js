import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyA4vnS5rybRuZfPq1kTP5suY6GA5zdoHIs",
  authDomain: "dry-cleaner-app.firebaseapp.com",
  projectId: "dry-cleaner-app",
  storageBucket: "dry-cleaner-app.appspot.com",
  messagingSenderId: "955442327984",
  appId: "1:955442327984:web:e4fbe69cc703820baaa675",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
