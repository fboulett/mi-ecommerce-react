import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG1EgfRkKiJys5QGM4yAnKqpb47ovftoA",
  authDomain: "apextienda-5b3b8.firebaseapp.com",
  projectId: "apextienda-5b3b8",
  storageBucket: "apextienda-5b3b8.firebasestorage.app",
  messagingSenderId: "455198037271",
  appId: "1:455198037271:web:3c47b4954ddfa4d62dd352",
  measurementId: "G-PWZKL5Z2FJ",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// Si agregaste Analytics verás esto además.
export const analytics = getAnalytics(app);
