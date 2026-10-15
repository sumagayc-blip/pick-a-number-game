function updateScoreDisplay() {
    const scoreElement = document.getElementById("score");

    if (!scoreElement) {
        return;
    }

    const score = Number(localStorage.getItem("score")) || 0;
    scoreElement.textContent = score;
}

function resetGame() {
    localStorage.removeItem("score");
    localStorage.removeItem("usedNumbers");

    const cards = document.querySelectorAll(".number-card");
    cards.forEach((card) => {
        card.classList.remove("used");
    });

    updateScoreDisplay();
}

function markUsedNumbers() {
    const usedNumbers = JSON.parse(localStorage.getItem("usedNumbers")) || [];
    const cards = document.querySelectorAll(".number-card");

    cards.forEach((card) => {
        const number = Number(card.dataset.number);

        if (usedNumbers.includes(number)) {
            card.classList.add("used");
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    updateScoreDisplay();
    markUsedNumbers();
});
