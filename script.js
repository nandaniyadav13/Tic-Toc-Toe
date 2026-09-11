let currentPlayer = "X";
let gameOver = false;
let vsComputer = false;
let difficulty = "easy"; // Default difficulty level
let scoreX = 0;
let scoreO = 0;
let drawScore = 0;

const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");
const drawScoreText = document.getElementById("drawScore");

const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turn");
const pvpButton = document.getElementById("pvp");
const computerButton = document.getElementById("computer");
const easyButton = document.getElementById("easy");
const mediumButton = document.getElementById("medium");
const hardButton = document.getElementById("hard");
const winnerPopup = document.getElementById("winner-popup");

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(function(cell) {

    cell.addEventListener("click", function() {

        if (cell.innerText !== "" || gameOver) {
            return;
        }

        cell.innerText = currentPlayer;
        cell.classList.add(currentPlayer);

        checkWinner();

        if (gameOver) {
            return;
        }
        if(vsComputer){
            currentPlayer="O";
            turnText.innerText="Computer's Turn";
            setTimeout(computerMove,500);
        } else{
            if (currentPlayer === "X") {
                currentPlayer = "O";
            } else {
                currentPlayer = "X";
            }

            turnText.innerText = "Player " + currentPlayer + "'s Turn";
        }

    }); 
            
});

function checkWinner() {

    for (let pattern of winningPatterns) {

        let a = cells[pattern[0]].innerText;
        let b = cells[pattern[1]].innerText;
        let c = cells[pattern[2]].innerText;

        if (a !== "" && a === b && b === c) {
            cells[pattern[0]].classList.add("winner");
            cells[pattern[1]].classList.add("winner");
            cells[pattern[2]].classList.add("winner");

            turnText.innerText = "";
            winnerPopup.innerText = "Player " + a + " Wins! 🎉";
            winnerPopup.classList.add("show");
            turnText.classList.add("win-message");

            if (a === "X") {
                scoreX++;
                scoreXText.innerText = scoreX;
            } else {
                scoreO++;
                scoreOText.innerText = scoreO;
            }

            gameOver = true;
            return;
      }
    }

    let boardFull = true;

    cells.forEach(function(cell) {
        if (cell.innerText === "") {
            boardFull = false;
        }
    });

    if (boardFull) {
        turnText.innerText = "";
        winnerPopup.innerText = "It's a Draw! 🤝";
        winnerPopup.classList.add("show");
        drawScore++;
        drawScoreText.innerText=drawScore;
        gameOver = true;
    }
}
function computerMove() {

    if (gameOver) {
        return;
    }

    let emptyCells = [];

    cells.forEach(function(cell, index) {
        if (cell.innerText === "") {
            emptyCells.push(index);
        }
    });

    if (emptyCells.length === 0) {
        return;
    }

    let move;

    // Easy = random move
    if (difficulty === "easy") {

        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        move = emptyCells[randomIndex];
    }

    // Medium = win or block
    else if (difficulty === "medium") {

        move = findBestMove("O");

        if (move === -1) {
            move = findBestMove("X");
        }

        if (move === -1) {
            let randomIndex = Math.floor(Math.random() * emptyCells.length);
            move = emptyCells[randomIndex];
        }
    }

    // Hard = smart move
    else {

        move = findBestMove("O");

        if (move === -1) {
            move = findBestMove("X");
        }

        if (move === -1 && cells[4].innerText === "") {
            move = 4;
        }

        if (move === -1) {
            let randomIndex = Math.floor(Math.random() * emptyCells.length);
            move = emptyCells[randomIndex];
        }
    }

    let computerCell = cells[move];

    computerCell.innerText = "O";
    computerCell.classList.add("O");

    checkWinner();

    if (!gameOver) {
        currentPlayer = "X";
        turnText.innerText = "Player X's Turn";
    }

}
function findBestMove(player) {

    for (let pattern of winningPatterns) {

        let a = cells[pattern[0]].innerText;
        let b = cells[pattern[1]].innerText;
        let c = cells[pattern[2]].innerText;

        if (a === player && b === player && c === "") {
            return pattern[2];
        }

        if (a === player && c === player && b === "") {
            return pattern[1];
        }

        if (b === player && c === player && a === "") {
            return pattern[0];
        }
    }

    return -1;
}

const restartButton = document.getElementById("restart");

restartButton.addEventListener("click", function() {

    cells.forEach(function(cell) {
        cell.innerText = "";
        cell.classList.remove("winner", "X", "O");
    });


    currentPlayer = "X";
    gameOver = false;

    turnText.innerText = "Player X's Turn";
    winnerPopup.classList.remove("show");
    winnerPopup.innerText = "";
    
});

pvpButton.addEventListener("click", function() {
    vsComputer = false;
    resetGame();
    turnText.innerText = "Player X's Turn";
});

computerButton.addEventListener("click", function() {
    vsComputer = true;
    resetGame();
    turnText.innerText = "Player X's Turn";
});
function resetGame(){
    cells.forEach(function(cell){
        cell.innerText = "";
        cell.classList.remove("winner", "X", "O");
    });
    currentPlayer = "X";
    gameOver=false;
    
}

easyButton.addEventListener("click", function() {
    difficulty = "easy";

    easyButton.classList.add("active");
    mediumButton.classList.remove("active");
    hardButton.classList.remove("active");
});

mediumButton.addEventListener("click", function() {
    difficulty = "medium";

    mediumButton.classList.add("active");
    easyButton.classList.remove("active");
    hardButton.classList.remove("active");
});

hardButton.addEventListener("click", function() {
    difficulty = "hard";

    hardButton.classList.add("active");
    easyButton.classList.remove("active");
    mediumButton.classList.remove("active");
});
