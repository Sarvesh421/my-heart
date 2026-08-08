// ==========================================
// SETTINGS
// ==========================================

const SIZE = 3;
const IMAGE = "./1000012446.jpg";

const board = document.getElementById("dropZone");
const piecesContainer = document.getElementById("piecesContainer");

const timer = document.getElementById("timer");
const movesText = document.getElementById("moves");

const preview = document.getElementById("previewModal");
const previewBtn = document.getElementById("previewBtn");
const closePreview = document.getElementById("closePreview");

const restartBtn = document.getElementById("restartBtn");

const success = document.getElementById("success");
const playAgain = document.getElementById("playAgain");

let draggedPiece = null;
let moves = 0;
let seconds = 0;
let timerInterval;


// ==========================================
// START
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    createPieces();
    setupSlots();
    startTimer();

});


// ==========================================
// TIMER
// ==========================================

function startTimer() {

    clearInterval(timerInterval);

    seconds = 0;

    timer.textContent = "00:00";

    timerInterval = setInterval(() => {

        seconds++;

        const minutes = String(
            Math.floor(seconds / 60)
        ).padStart(2, "0");

        const secs = String(
            seconds % 60
        ).padStart(2, "0");

        timer.textContent = `${minutes}:${secs}`;

    }, 1000);

}


// ==========================================
// CREATE PUZZLE PIECES
// ==========================================

function createPieces() {

    piecesContainer.innerHTML = "";

    let order = [];

    // Create 0 - 8
    for (let i = 0; i < 9; i++) {
        order.push(i);
    }

    shuffle(order);

    order.forEach(index => {

        const piece = document.createElement("div");

        piece.className = "piece";

        piece.dataset.index = index;

        // IMPORTANT
        piece.style.backgroundImage = `url("${IMAGE}")`;

        /*
            3x3 image positions

            0   1   2
            3   4   5
            6   7   8
        */

        const column = index % 3;
        const row = Math.floor(index / 3);

        const x = column * 50;
        const y = row * 50;

        piece.style.backgroundPosition =
            `${x}% ${y}%`;

        piece.draggable = true;

        addDragEvents(piece);

        piecesContainer.appendChild(piece);

    });

}


// ==========================================
// SHUFFLE
// ==========================================

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [array[i], array[j]] =
            [array[j], array[i]];

    }

}


// ==========================================
// DRAG EVENTS
// ==========================================

function addDragEvents(piece) {

    piece.addEventListener(
        "dragstart",
        dragStart
    );

    piece.addEventListener(
        "dragend",
        dragEnd
    );

}


// ==========================================
// DRAG START
// ==========================================

function dragStart(e) {

    draggedPiece = this;

    e.dataTransfer.effectAllowed = "move";

    e.dataTransfer.setData(
        "text/plain",
        this.dataset.index
    );

    this.classList.add("dragging");

}


// ==========================================
// DRAG END
// ==========================================

function dragEnd() {

    this.classList.remove("dragging");

}


// ==========================================
// SETUP SLOTS
// ==========================================

function setupSlots() {

    const slots =
        document.querySelectorAll(".slot");

    slots.forEach(slot => {

        slot.addEventListener(
            "dragover",
            e => {

                e.preventDefault();

                slot.classList.add("over");

            }
        );

        slot.addEventListener(
            "dragleave",
            () => {

                slot.classList.remove("over");

            }
        );

        slot.addEventListener(
            "drop",
            () => {

                slot.classList.remove("over");

                if (!draggedPiece) {
                    return;
                }

                // Don't replace existing piece
                if (slot.children.length > 0) {
                    return;
                }

                slot.appendChild(draggedPiece);

                moves++;

                movesText.textContent = moves;

                checkPuzzle();

                draggedPiece = null;

            }
        );

    });

}


// ==========================================
// CHECK PUZZLE
// ==========================================

function checkPuzzle() {

    const slots =
        document.querySelectorAll(".slot");

    let correct = 0;

    slots.forEach(slot => {

        if (slot.children.length === 0) {
            return;
        }

        const piece = slot.children[0];

        if (
            piece.dataset.index ===
            slot.dataset.index
        ) {

            correct++;

        }

    });

    if (correct === 9) {

        clearInterval(timerInterval);

        setTimeout(() => {

            success.style.display = "flex";

        }, 300);

    }

}


// ==========================================
// PREVIEW
// ==========================================

previewBtn.addEventListener(
    "click",
    () => {

        preview.style.display = "flex";

    }
);


// ==========================================
// CLOSE PREVIEW
// ==========================================

closePreview.addEventListener(
    "click",
    () => {

        preview.style.display = "none";

    }
);


// ==========================================
// PLAY AGAIN
// ==========================================

playAgain.addEventListener(
    "click",
    () => {

        success.style.display = "none";

        restartGame();

    }
);


// ==========================================
// RESTART
// ==========================================

restartBtn.addEventListener(
    "click",
    restartGame
);


function restartGame() {

    moves = 0;

    movesText.textContent = "0";

    const slots =
        document.querySelectorAll(".slot");

    slots.forEach(slot => {

        slot.innerHTML = "";

    });

    createPieces();

    startTimer();

}