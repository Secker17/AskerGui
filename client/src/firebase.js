import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAOCEKvzROBDPubA6c5AUQ5dIXuvoeUlxY",
  authDomain: "askergui.firebaseapp.com",
  projectId: "askergui",
  storageBucket: "askergui.firebasestorage.app",
  messagingSenderId: "187274761862",
  appId: "1:187274761862:web:57fc23be3fef76c1852307",
  measurementId: "G-R1H8VNGZT3",
  databaseURL: "https://askergui-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export default app;
