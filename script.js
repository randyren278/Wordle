import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];

console.log(rightGuessString);

function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div");
        row.className = "letter-row";

        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box);
        }

        board.appendChild(row);
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor;
            if (oldColor === "green") {
                return;
            }

            if (oldColor === "#e6b400" && color !== "green") {
                return;
            }

            elem.style.backgroundColor = color;
            break;
        }
    }
}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
}

function checkGuess() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let guessString = "";
    let rightGuess = Array.from(rightGuessString);

    for (const val of currentGuess) {
        guessString += val;
    }

    if (guessString.length != 5) {
        toastr.error("Not enough letters!");
        return;
    }

    if (!WORDS.includes(guessString)) {
        toastr.error("Word not in list!");
        return;
    }

    var letterColor = ["gray", "gray", "gray", "gray", "gray"];

    //check green
    for (let i = 0; i < 5; i++) {
        if (rightGuess[i] == currentGuess[i]) {
            letterColor[i] = "green";
            rightGuess[i] = "#";
        }
    }

    //check yellow
    //checking guess letters
    for (let i = 0; i < 5; i++) {
        if (letterColor[i] == "green") continue;

        //checking right letters
        for (let j = 0; j < 5; j++) {
            if (rightGuess[j] == currentGuess[i]) {
                letterColor[i] = "#e6b400";
                rightGuess[j] = "#";
            }
        }
    }

    for (let i = 0; i < 5; i++) {
        let box = row.children[i];
        let delay = 250 * i;
        setTimeout(() => {
            //flip box
            animateCSS(box, "flipInX");
            //shade box
            box.style.backgroundColor = letterColor[i];
            shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
        }, delay);
    }

    if (guessString === rightGuessString) {
        toastr.success("You guessed right! Game over!");
        guessesRemaining = 0;
        return;
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!");
            toastr.info(`The right word was: "${rightGuessString}"`);
        }
    }
}

function insertLetter(pressedKey) {
    if (nextLetter === 5) {
        return;
    }
    pressedKey = pressedKey.toLowerCase();

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter];
    animateCSS(box, "pulse");
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    nextLetter += 1;
}

const animateCSS = (element, animation, prefix = "animate__") =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        // const node = document.querySelector(element);
        const node = element;
        node.style.setProperty("--animate-duration", "0.3s");

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve("Animation ended");
        }

        node.addEventListener("animationend", handleAnimationEnd, { once: true });
    });

document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) {
        return;
    }

    let pressedKey = String(e.key);
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter();
        return;
    }

    if (pressedKey === "Enter") {
        checkGuess();
        return;
    }

    let found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
        return;
    } else {
        insertLetter(pressedKey);
    }
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target;

    if (!target.classList.contains("keyboard-button")) {
        return;
    }
    let key = target.textContent;

    if (key === "Del") {
        key = "Backspace";
    }

    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});

function setTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme','taro-theme','pulse-theme','beach-theme');
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else if (theme=== 'dark') {
        document.body.classList.add('dark-theme');
    } else if (theme==='taro') {
        document.body.classList.add('taro-theme');
    } else if (theme==='pulse') {
        document.body.classList.add('pulse-theme');
    } else if (theme==='beach') {
        document.body.classList.add('beach-theme');
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const themesButton = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Function to set the dropdown content width
    function setDropdownWidth() {
        dropdownContent.style.width = `${themesButton.offsetWidth}px`;
    }

    // Initial setting of the dropdown content width
    setDropdownWidth();

    // Event listener for window resize to adjust the dropdown content width
    window.addEventListener('resize', setDropdownWidth);

    // Event listeners for theme change
    document.getElementById("light-theme-btn").addEventListener("click", () => setTheme('light'));
    document.getElementById("dark-theme-btn").addEventListener("click", () => setTheme('dark'));
    document.getElementById("taro-theme-btn").addEventListener("click", () => setTheme('taro'));
    document.getElementById("pulse-theme-btn").addEventListener("click", () => setTheme('pulse'));
    document.getElementById("beach-theme-btn").addEventListener("click", () => setTheme("beach"));
});

function solveGame() {
    let potentialWords = WORDS.slice();
    let solved = false;
    let isFirstGuess = true;

    function getFeedback(guess, solution) {
        let feedback = ["gray", "gray", "gray", "gray", "gray"];
        let solutionChars = solution.split("");

        // Check for correct positions (green)
        for (let i = 0; i < 5; i++) {
            if (guess[i] === solution[i]) {
                feedback[i] = "green";
                solutionChars[i] = null; // Mark as used
            }
        }

        // Check for correct letters in wrong positions (yellow)
        for (let i = 0; i < 5; i++) {
            if (feedback[i] !== "green" && solutionChars.includes(guess[i])) {
                feedback[i] = "#e6b400";
                solutionChars[solutionChars.indexOf(guess[i])] = null; // Mark as used
            }
        }

        return feedback;
    }

    function filterWords(guess, feedback) {
        potentialWords = potentialWords.filter(word => {
            let tempFeedback = getFeedback(guess, word);
            return tempFeedback.every((val, index) => val === feedback[index]);
        });
    }

    function makeGuess() {
        if (isFirstGuess) {
            isFirstGuess = false;
            return "soare";
        }
        // Here we just choose the first potential word for simplicity
        // More advanced strategies can be used for better performance
        return potentialWords[0];
    }

    function guessRow(row, callback) {
        if (guessesRemaining === 0) return;

        let guess = makeGuess();
        console.log(`Guessing: ${guess}`);
        
        for (let i = 0; i < guess.length; i++) {
            let box = row.children[i];
            box.textContent = guess[i];
            box.classList.add("filled-box");
        }
        
        let feedback = getFeedback(guess, rightGuessString);
        console.log(`Feedback: ${feedback.join(", ")}`);
        
        let promises = [];
        
        for (let i = 0; i < feedback.length; i++) {
            let box = row.children[i];
            let delay = 250 * i;
            promises.push(
                new Promise(resolve => {
                    setTimeout(() => {
                        animateCSS(box, "flipInX");
                        box.style.backgroundColor = feedback[i];
                        shadeKeyBoard(guess.charAt(i) + "", feedback[i]);
                        resolve();
                    }, delay);
                })
            );
        }

        Promise.all(promises).then(() => {
            if (guess === rightGuessString) {
                toastr.success("You guessed right! Game over!");
                guessesRemaining = 0;
                solved = true;
                return;
            } else {
                guessesRemaining -= 1;
                filterWords(guess, feedback);
                console.log(`Remaining words: ${potentialWords.join(", ")}`);
                if (guessesRemaining === 0) {
                    toastr.error("You've run out of guesses! Game over!");
                    toastr.info(`The right word was: "${rightGuessString}"`);
                    return;
                } else {
                    callback();
                }
            }
        });
    }

    function startGuessing() {
        function guessNextRow() {
            if (guessesRemaining === 0 || solved) return;
            let nextRow = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
            guessRow(nextRow, guessNextRow);
        }
        
        guessNextRow();
    }

    startGuessing();
}

document.getElementById("solve-button").addEventListener("click", solveGame);

initBoard();
