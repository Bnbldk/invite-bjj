import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue, push, runTransaction } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

let firebaseConfig = {
    apiKey: "AIzaSyDD4p1KU_EcVJve8cGe6ufMllwu-sonCPg",  // This should be replaced in GitHub Actions
    authDomain: "bruno-invite-bjj.firebaseapp.com",
    databaseURL: "https://bruno-invite-bjj-default-rtdb.firebaseio.com/",
    projectId: "bruno-invite-bjj",
    storageBucket: "bruno-invite-bjj.appspot.com",
    messagingSenderId: "405981974320",
    appId: "1:405981974320:web:78d5f019db2631ada702f5",
    measurementId: "G-JQPVJJECVT"
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