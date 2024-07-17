const gameBoard = document.getElementById('game-board');
const keyboard = document.getElementById('keyboard');
const enterKey = document.getElementById('enter');
const backspaceKey = document.getElementById('backspace');
const wordList = ["apple", "brave", "crane", "drape", "eagle"];
let currentWord = wordList[Math.floor(Math.random() * wordList.length)];
let currentRow = 0;
let currentCol = 0;
let attempts = ["", "", "", "", "", ""];

function createBoard() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            gameBoard.appendChild(tile);
        }
    }
}

function handleKeyPress(e) {
    const key = e.target.textContent;
    if (key === 'Enter') {
        submitGuess();
    } else if (key === 'Backspace') {
        removeLetter();
    } else {
        addLetter(key);
    }
}

function addLetter(letter) {
    if (currentCol < 5 && currentRow < 6) {
        const tiles = document.querySelectorAll('.tile');
        const tileIndex = currentRow * 5 + currentCol;
        tiles[tileIndex].textContent = letter;
        attempts[currentRow] += letter;
        currentCol++;
    }
}

function removeLetter() {
    if (currentCol > 0) {
        currentCol--;
        const tiles = document.querySelectorAll('.tile');
        const tileIndex = currentRow * 5 + currentCol;
        tiles[tileIndex].textContent = '';
        attempts[currentRow] = attempts[currentRow].slice(0, -1);
    }
}

function submitGuess() {
    if (attempts[currentRow].length === 5) {
        checkGuess();
        currentRow++;
        currentCol = 0;
    }
}

function checkGuess() {
    const guess = attempts[currentRow];
    const tiles = document.querySelectorAll('.tile');
    for (let i = 0; i < 5; i++) {
        const tileIndex = currentRow * 5 + i;
        const letter = guess[i];
        if (currentWord[i] === letter) {
            tiles[tileIndex].style.backgroundColor = 'green';
        } else if (currentWord.includes(letter)) {
            tiles[tileIndex].style.backgroundColor = 'yellow';
        } else {
            tiles[tileIndex].style.backgroundColor = 'gray';
        }
    }
}

createBoard();
keyboard.addEventListener('click', handleKeyPress);
