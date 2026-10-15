const sharedMusicPath = "audio/music.mp3";

const musicLibrary = {
    harana: {
        src: sharedMusicPath,
        voice: "Question one. What does HTML stand for? Hypertext Markup Language."
    },
    kundiman: {
        src: sharedMusicPath,
        voice: "Question two. What does CSS stand for? Cascading Style Sheets."
    },
    pop: {
        src: sharedMusicPath,
        voice: "Question three. What does CPU stand for? Central Processing Unit."
    },
    rock: {
        src: sharedMusicPath,
        voice: "Question four. What does SQL stand for? Structured Query Language."
    },
    dance: {
        src: sharedMusicPath,
        voice: "Question five. What is JavaScript mainly used for on a webpage? Interactivity."
    }
};

let currentAudio = null;

function getCurrentTrack() {
    const pageMusic = document.body && document.body.dataset && document.body.dataset.music;
    return musicLibrary[pageMusic] || musicLibrary.harana;
}

function updateMusicButton(isPlaying) {
    const button = document.getElementById("musicBtn");

    if (!button) {
        return;
    }

    button.textContent = isPlaying ? "❚❚ MUSIC" : "▶ MUSIC";
    button.setAttribute("aria-pressed", String(isPlaying));
}

function speakQuestion(track) {
    if (!window.speechSynthesis) {
        return;
    }

    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(track.voice);
    message.lang = "en-US";
    message.rate = 0.9;
    message.pitch = 1;

    window.speechSynthesis.speak(message);
}

function stopMusic() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }

    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }

    updateMusicButton(false);
}

function toggleMusic() {
    const track = getCurrentTrack();

    if (!track) {
        return;
    }

    if (currentAudio && !currentAudio.paused) {
        stopMusic();
        return;
    }

    currentAudio = new Audio(track.src);
    currentAudio.loop = true;
    currentAudio.volume = 0.85;

    currentAudio.play().catch(() => {
        console.log("Audio playback was blocked until the user clicks the button.");
    });

    speakQuestion(track);
    updateMusicButton(true);
}

document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("musicBtn");

    if (button) {
        button.addEventListener("click", toggleMusic);
    }

    window.addEventListener("beforeunload", stopMusic);
});
