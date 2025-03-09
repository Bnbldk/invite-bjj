import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue, push, runTransaction } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

let firebaseConfig;
    firebaseConfig = {
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

// ✅ Check if `configProd.js` still contains placeholders (Secrets not injected)
if (firebaseConfig.apiKey === "AIzaSyDD4p1KU_EcVJve8cGe6ufMllwu-sonCPg") {
    try {
        // ✅ Try importing `config.js` (Local Development)
        const module = await import("./config.js");
        firebaseConfig = module.default;
        console.log("✅ Firebase config loaded from config.js.");
    } catch (error) {
        console.error("❌ Firebase configuration is missing! Please check configProd.js or config.js.");
        throw new Error("Firebase config not found.");
    }
}

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log("✅ Firebase Initialized Successfully!");

// ✅ Export Firebase functions
export { database, ref, onValue, push, runTransaction };