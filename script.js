
/* =====================================
   A LITTLE WORLD FOR MY BESTIE
   COMPLETE JAVASCRIPT
===================================== */

// ==============================
// GET HTML ELEMENTS
// ==============================

const openingScreen = document.getElementById("opening-screen");
const friendshipScreen = document.getElementById("friendship-screen");
const memoriesScreen = document.getElementById("memories-screen");
const letterScreen = document.getElementById("letter-screen");
const timelineScreen = document.getElementById("timeline-screen");

const startButton = document.getElementById("start-button");
const memoriesButton = document.getElementById("memories-button");
const backFriendshipButton = document.getElementById("back-friendship-button");

const letterScreenButton = document.getElementById("letter-screen-button");
const openLetterButton = document.getElementById("open-letter-button");
const secretLetter = document.getElementById("secret-letter");

const timelineButton = document.getElementById("timeline-button");
const timelineBackButton = document.getElementById("timeline-back-button");


// ==============================
// SCREEN NAVIGATION
// ==============================

function showScreen(screenToShow) {
    // Hide every screen, including newly added screens
    document.querySelectorAll(".screen").forEach(function (screen) {
        screen.classList.remove("active");
    });

    // Show the requested screen
    if (screenToShow) {
        screenToShow.classList.add("active");
    }

    // Restart the typing animation on the friendship screen
    if (screenToShow === friendshipScreen) {
        startTypingEffect();
    }
}

startButton.addEventListener("click", function () {
    showScreen(friendshipScreen);
});

memoriesButton.addEventListener("click", function () {
    showScreen(memoriesScreen);
});

backFriendshipButton.addEventListener("click", function () {
    showScreen(friendshipScreen);
});

letterScreenButton.addEventListener("click", function () {
    showScreen(letterScreen);
});

timelineButton.addEventListener("click", function () {
    showScreen(timelineScreen);
});

timelineBackButton.addEventListener("click", function () {
    showScreen(friendshipScreen);
});


// ==============================
// LETTER-BY-LETTER TYPING EFFECT
// ==============================

// Select the two messages directly from your HTML
const typingMessages = document.querySelectorAll(
    "#friendship-screen .friendship-quote, " +
    "#friendship-screen .friendship-note"
);

// Save the original text before starting the animation
const originalMessages = Array.from(typingMessages).map(function (element) {
    element.classList.add("typing-message");
    return element.textContent.replace(/\s+/g, " ").trim();
});

let typingRun = 0;

function startTypingEffect() {
    typingRun++;
    const currentRun = typingRun;

    typingMessages.forEach(function (element) {
        element.textContent = "";
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
    });

    function typeMessage(messageIndex) {
        if (currentRun !== typingRun) return;
        if (messageIndex >= typingMessages.length) return;

        const element = typingMessages[messageIndex];
        const message = originalMessages[messageIndex];
        let characterIndex = 0;

        function typeCharacter() {
            if (currentRun !== typingRun) return;
            if (!friendshipScreen.classList.contains("active")) return;

            if (characterIndex < message.length) {
                element.textContent += message.charAt(characterIndex);
                characterIndex++;

                setTimeout(typeCharacter, 30);
            } else {
                setTimeout(function () {
                    typeMessage(messageIndex + 1);
                }, 350);
            }
        }

        typeCharacter();
    }

    typeMessage(0);
}


// ==============================
// SECRET LETTER
// ==============================

openLetterButton.addEventListener("click", function () {
    secretLetter.hidden = false;
    openLetterButton.textContent = "Your letter is open 💖";
    openLetterButton.disabled = true;
});


// ==============================
// FULL-SCREEN PHOTO VIEWER
// ==============================

const photoViewer = document.getElementById("photo-viewer");
const expandedPhoto = document.getElementById("expanded-photo");
const closePhotoViewer = document.getElementById("close-photo-viewer");

const memoryPhotos = document.querySelectorAll(
    ".memory-card .photo-placeholder img"
);

let previouslyOpenedPhoto = null;

memoryPhotos.forEach(function (photo) {
    photo.style.cursor = "zoom-in";
    photo.setAttribute("tabindex", "0");

    function openPhoto() {
        previouslyOpenedPhoto = photo;

        expandedPhoto.src = photo.src;
        expandedPhoto.alt = photo.alt;

        photoViewer.classList.add("open");
        photoViewer.setAttribute("aria-hidden", "false");

        closePhotoViewer.focus();
    }

    photo.addEventListener("click", openPhoto);

    photo.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPhoto();
        }
    });
});

function closeViewer() {
    photoViewer.classList.remove("open");
    photoViewer.setAttribute("aria-hidden", "true");

    expandedPhoto.src = "";

    if (previouslyOpenedPhoto) {
        previouslyOpenedPhoto.focus();
    }
}

closePhotoViewer.addEventListener("click", closeViewer);

photoViewer.addEventListener("click", function (event) {
    if (event.target === photoViewer) {
        closeViewer();
    }
});

document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        photoViewer.classList.contains("open")
    ) {
        closeViewer();
    }
});


const letterBackButton = document.getElementById("letter-back-button");

letterBackButton.addEventListener("click", function () {
    showScreen(friendshipScreen);
});