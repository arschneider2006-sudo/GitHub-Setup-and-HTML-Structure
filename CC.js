const board = document.getElementById("gameBoard");
const movesText = document.getElementById("moves");
const matchesText = document.getElementById("matches");
const sightingsText = document.getElementById("sightings");
const message = document.getElementById("message");

const cards = [
    "🐄","🐄",
    "👽","👽",
    "🛸","🛸",
    "🚀","🚀",
    "🪐","🪐",
    "🌟","🌟",
    "☄️","☄️",
    "🛰️","🛰️",
    "🧑","🧑"
];

let first = null;
let second = null;
let lock = false;
let moves = 0;
let matches = 0;
let sightings = 0;

cards.sort(() => Math.random() - 0.5);

cards.forEach(symbol => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.symbol = symbol;

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-face card-back">❓</div>
            <div class="card-face card-front">${symbol}</div>
        </div>
    `;

    card.onclick = flipCard;
    board.appendChild(card);
});

function flipCard() {

    if (lock || this === first || this.classList.contains("matched")) return;

    this.classList.add("flipped");

    // Human card
    if (this.dataset.symbol === "🧑") {

        sightings++;
        sightingsText.textContent = sightings;

        setTimeout(() => {
            this.classList.remove("flipped");

            if (sightings === 2) {
                message.textContent = "Mission Failed!";
                lock = true;
            }
        }, 800);

        return;
    }

    if (!first) {
        first = this;
        return;
    }

    second = this;

    moves++;
    movesText.textContent = moves;

    lock = true;

    if (first.dataset.symbol === second.dataset.symbol) {

        first.classList.add("matched");
        second.classList.add("matched");

        matches++;
        matchesText.textContent = matches;

        first = null;
        second = null;
        lock = false;

        if (matches === 8) {
            message.textContent = "Mission Complete!";
        }

    } else {

        setTimeout(() => {
            first.classList.remove("flipped");
            second.classList.remove("flipped");

            first = null;
            second = null;
            lock = false;
        }, 800);

    }

}

document.getElementById("restartBtn").onclick = () => location.reload();
