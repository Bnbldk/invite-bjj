//Load only the API key from GitHub Secrets (injected by GitHub Actions)
    const firebaseConfig = {
        apiKey: "__FIREBASE_API_KEY__",
        authDomain: "__FIREBASE_AUTH_DOMAIN__",
        databaseURL: "__FIREBASE_DATABASE_URL__",
        projectId: "__FIREBASE_PROJECT_ID__",
        storageBucket: "__FIREBASE_STORAGE_BUCKET__",
        messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
        appId: "__FIREBASE_APP_ID__",
        measurementId: "__FIREBASE_MEASUREMENT_ID__"
        };

// Export Firebase config for firebase.js
export default firebaseConfig;