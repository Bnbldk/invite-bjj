import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue, push, runTransaction } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

let firebaseConfig = {
    apiKey: "__FIREBASE_API_KEY__",
    authDomain: "__FIREBASE_AUTH_DOMAIN__",
    databaseURL: "__FIREBASE_DATABASE_URL__",
    projectId: "__FIREBASE_PROJECT_ID__",
    storageBucket: "__FIREBASE_STORAGE_BUCKET__",
    messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
    appId: "__FIREBASE_APP_ID__",
    measurementId: "__FIREBASE_MEASUREMENT_ID__"
};

// Debugging: Log Firebase API key to check if it's loading correctly
console.log("🔥 Firebase API Key Loaded:", firebaseConfig.apiKey);

// ✅ Function to check and load Firebase Config dynamically
async function loadFirebaseConfig() {
    if (firebaseConfig.apiKey === "__FIREBASE_API_KEY__") {
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