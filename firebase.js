import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue, push, runTransaction } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

let firebaseConfig = {
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
console.log("🔥 Firebase API Key Loaded:", firebaseConfig.apiKey);

// ✅ Function to check and load Firebase Config dynamically
async function loadFirebaseConfig() {
    if (firebaseConfig.apiKey === "AIzaSyDD4p1KU_EcVJve8cGe6ufMllwu-sonCPg") {
        try {
            // ✅ Dynamically import `config.js` (for Local Development)
            const module = await import("./config.js");
            firebaseConfig = module.default;
            console.log("✅ Firebase config loaded from config.js.");
        } catch (error) {
            console.warn("⚠️ Firebase configuration is missing! Using default placeholder config.");
            // Instead of throwing an error, we allow the flow to continue
        }
    }

    // ✅ Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    console.log("✅ Firebase Initialized Successfully!");

    return { database, ref, onValue, push, runTransaction };
}

// ✅ Export Firebase instance (Ensures Firebase initializes before being used)
export const { database } = await loadFirebaseConfig();
export { ref, onValue, push, runTransaction };