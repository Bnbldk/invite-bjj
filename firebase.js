import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue, push, runTransaction } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

let firebaseConfig;

        firebaseConfig = {
            apiKey: "__FIREBASE_API_KEY__",
            authDomain: "__FIREBASE_AUTH_DOMAIN__",
            databaseURL: "__FIREBASE_DATABASE_URL__",
            projectId: "__FIREBASE_PROJECT_ID__",
            storageBucket: "__FIREBASE_STORAGE_BUCKET__",
            messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
            appId: "__FIREBASE_APP_ID__",
            measurementId: "__FIREBASE_MEASUREMENT_ID__"
            };

// ✅ Check if `configProd.js` still contains placeholders (Secrets not injected)
if (!firebaseConfig || firebaseConfig.apiKey === "__FIREBASE_API_KEY__") {
    console.warn("⚠️ Firebase keys not found in configProd.js! Trying config.js...");

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