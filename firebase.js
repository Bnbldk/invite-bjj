import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

async function loadFirebaseConfig() {
    try {
        const response = await fetch("/firebase-config.json"); // Securely fetch config
        const firebaseConfig = await response.json();

        if (!firebaseConfig || !firebaseConfig.apiKey) {
            throw new Error("Firebase config not found.");
        }

        const app = initializeApp(firebaseConfig);
        console.log("🔥 Firebase Initialized Securely:", app);
        return getDatabase(app);
    } catch (error) {
        console.error("❌ Error loading Firebase config:", error);
    }
}

export const database = await loadFirebaseConfig();