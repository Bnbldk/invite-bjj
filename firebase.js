import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue, push, runTransaction } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

    // Load only the API key from GitHub Secrets (injected by GitHub Actions)
    const firebaseConfig = {
        apiKey: "AIzaSyDD4p1KU_EcVJve8cGe6ufMllwu-sonCPg",
        authDomain: "bruno-invite-bjj.firebaseapp.com",
        databaseURL: "https://bruno-invite-bjj-default-rtdb.firebaseio.com/",
        projectId: "bruno-invite-bjj",
        storageBucket: "bruno-invite-bjj.appspot.com",
        messagingSenderId: "405981974320",
        appId: "1:405981974320:web:78d5f019db2631ada702f5",
        measurementId: "G-JQPVJJECVT"
        };

// Debugging: Log Firebase API key to check if it's loading correctly
console.log("🔥 Firebase API Key Loaded 111:", firebaseConfig.apiKey);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export database and Firebase functions
export { database, ref, onValue, push, runTransaction };

