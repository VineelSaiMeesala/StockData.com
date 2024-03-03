import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDPR3c8BxyPpvnGnXWA6Fza5bBFpinsR4Q",
  authDomain: "blogwiki-26c37.firebaseapp.com",
  projectId: "blogwiki-26c37",
  storageBucket: "blogwiki-26c37.appspot.com",
  messagingSenderId: "999368815496",
  appId: "1:999368815496:web:db95ead7abf0215101c03d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
