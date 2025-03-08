import { database, ref, onValue, push, runTransaction } from './firebase.js';

// Like Counter Reference
const likeRef = ref(database, 'likeCounter');

// Function to retrieve and display likes
onValue(likeRef, (snapshot) => {
    const likeCount = snapshot.val() || 0;
    document.getElementById('likeCounter').innerText = "Likes: " + likeCount;
});

// Function to add likes and trigger animation
window.addLike = function() {
    runTransaction(likeRef, (currentLikes) => {
        return (currentLikes || 0) + 1;
    });

    showLikes(); // Call animation function
};

// Function to show like animation
function showLikes() {
    const likeContainer = document.getElementById("likeAnimation");

    for (let i = 0; i < 8; i++) {
        const icon = document.createElement("div");
        icon.classList.add("icon");

        // Change red heart ❤️ to green 💚
        icon.innerHTML = Math.random() > 0.5 ? "👍" : "💚";

        icon.style.left = Math.random() * 200 - 100 + "px";
        icon.style.animationDuration = (1.5 + Math.random()) + "s"; // Slower float effect
        likeContainer.appendChild(icon);

        setTimeout(() => icon.remove(), 2000); // Extended lifetime
    }
}

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