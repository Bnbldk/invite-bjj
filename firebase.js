import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import firebaseConfig from "./firebase-config.js"; // This will be generated at deployment

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase Initialized:", app);