import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue, push, runTransaction } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

let firebaseConfig = {
    apiKey: "__FIREBASE_API_KEY__",  // This should be replaced in GitHub Actions
    authDomain: "__FIREBASE_AUTH_DOMAIN__",
    databaseURL: "__FIREBASE_DATABASE_URL__",
    projectId: "__FIREBASE_PROJECT_ID__",
    storageBucket: "__FIREBASE_STORAGE_BUCKET__",
    messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
    appId: "__FIREBASE_APP_ID__",
    measurementId: "__FIREBASE_MEASUREMENT_ID__"
};

// ✅ Function to check and load Firebase Config dynamically
async function loadFirebaseConfig() {
    const isPlaceholder = !firebaseConfig.apiKey || firebaseConfig.apiKey.includes("FIREBASE_API_KEY");

    console.log("🔄 Checking Firebase API Key:", isPlaceholder ? "**** (Placeholder Detected)" : "**** (Loaded Securely)");

    if (isPlaceholder) {
        console.warn("⚠️ Firebase API Key is still a placeholder! Attempting to load config.js...");
        try {
            // ✅ Dynamically import `config.js` for local development
            const module = await import("./config.js");
            firebaseConfig = module.default;
            console.log("✅ Firebase config successfully loaded from config.js.");
        } catch (error) {
            console.warn("⚠️ Firebase configuration is missing! Using default placeholder config.");
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