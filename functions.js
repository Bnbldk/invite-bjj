import { database, ref, onValue, push, runTransaction } from './firebase.js';

// Like Counter Reference
const likeRef = ref(database, 'likeCounter');

// Function to retrieve and display likes
onValue(likeRef, (snapshot) => {
    const likeCount = snapshot.val() || 0;
    document.getElementById('likeCounter').innerText = "Likes: " + likeCount;
});

// Function to add likes
window.addLike = function() {
    runTransaction(likeRef, (currentLikes) => {
        return (currentLikes || 0) + 1;
    });
};

// Guest List Reference
const guestListRef = ref(database, 'guestList');

// Function to add a guest to Firebase
window.addGuest = function() {
    const guestInput = document.getElementById("guestName");
    const confirmButton = document.getElementById("confirmButton");

    if (guestInput.value.trim() !== "") {
        // Get timestamp
        const timestamp = new Date().toLocaleString();

        // Push to Firebase
        push(guestListRef, {
            name: guestInput.value,
            time: timestamp
        });

        // Disable button for 10 seconds
        confirmButton.disabled = true;
        setTimeout(() => {
            confirmButton.disabled = false;
        }, 10000); // 10 seconds

        // Clear input
        guestInput.value = "";
    }
};

// Listen for changes in the guest list
onValue(guestListRef, (snapshot) => {
    const guestList = document.getElementById("guestNames");
    guestList.innerHTML = ""; // Clear list

    snapshot.forEach((childSnapshot) => {
      const guestData = childSnapshot.val();
      const li = document.createElement("li");
      li.textContent = `${guestData.name} (⏳ ${guestData.time})`;
      guestList.appendChild(li);
    });
});