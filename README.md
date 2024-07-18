# Eldrow+

Eldrow+ is a word guessing game where players try to guess a hidden word within a limited number of attempts. This README provides an overview of the application's structure and the logic systems used, particularly focusing on the solving functionality.

## Table of Contents

- [Project Structure](#project-structure)
- [Gallery](#gallery)
- [Game Logic](#game-logic)
- [Solving Functionality](#solving-functionality)
- [Theme Persistence](#theme-persistence)
- [Usage](#usage)

## Project Structure

The project consists of the following files:

- `index.html`: The main HTML file that sets up the structure of the web page.
- `styles.css`: The CSS file that defines the styles for the game.
- `script.js`: The main JavaScript file containing the game logic and interactivity.
- `words.js`: A JavaScript file containing an array of possible words for the game.

### index.html

Sets up the structure of the game, including the game board, keyboard, and theme buttons.

### styles.css

Defines the styles for the game, including themes and layout.

### script.js

Contains the main game logic and handles user interactions.

### words.js

Contains an array of possible words that can be selected as the hidden word to guess.

## Gallery
![alt text](<Screenshot 2024-07-18 at 12.37.10 AM.png>)
![alt text](<Screenshot 2024-07-18 at 12.37.25 AM.png>)
[text](<../../Screen Recording 2024-07-18 at 12.41.04 AM.mov>)

## Game Logic

### Variables

- `NUMBER_OF_GUESSES`: Total number of guesses allowed.
- `guessesRemaining`: Tracks the remaining guesses.
- `currentGuess`: Array holding the current guess letters.
- `nextLetter`: Index of the next letter to be added to the current guess.
- `rightGuessString`: The word to be guessed, selected randomly from the `WORDS` array.

### Functions

#### initBoard()

Initializes the game board by creating rows and boxes for each letter guess.

#### shadeKeyBoard(letter, color)

Updates the color of the on-screen keyboard buttons based on feedback (correct letter and position, correct letter wrong position, or incorrect letter).

#### deleteLetter()

Deletes the last letter entered in the current guess and updates the game board.

#### checkGuess()

Checks if the current guess is correct and provides feedback by coloring the letters. Updates the number of remaining guesses and determines if the game is over.

#### insertLetter(pressedKey)

Inserts a letter into the current guess and updates the game board.

#### animateCSS(element, animation, prefix)

Adds CSS animations to elements and returns a promise that resolves when the animation ends.

### Event Listeners

- **Keyboard Input**: Handles keyboard input for entering and deleting letters, and for submitting guesses.
- **On-Screen Keyboard**: Handles input from the on-screen keyboard.
- **Theme Buttons**: Changes the theme and saves the selected theme to localStorage.
- **Logo Button**: Reloads the page.

## Solving Functionality

### Logic Overview

The solving functionality attempts to guess the hidden word by making educated guesses and filtering possible words based on feedback from each guess.

### Functions

#### getFeedback(guess, solution)

Compares the guess with the solution and returns an array of feedback colors indicating correct letters and positions.

#### filterWords(guess, feedback)

Filters the list of potential words based on the feedback from the guess.

#### makeGuess()

Makes an initial guess ("soare") and subsequent guesses based on the remaining potential words.

#### guessRow(row, callback)

Handles making a guess for a specific row, displaying feedback, and invoking the callback to guess the next row after animations complete.

#### startGuessing()

Starts the guessing process by calling `guessNextRow`.

### Detailed Algorithm and Logic for Efficient Solving

The solver algorithm is designed to efficiently guess the hidden word by leveraging feedback to narrow down the list of possible words. Here’s a step-by-step breakdown of the process:

#### Initial Guess

- The initial guess is always "soare", chosen for its common letters and strategic value in narrowing down possibilities.

#### Feedback Processing

- **getFeedback(guess, solution)**: This function generates feedback for a guess by comparing it to the solution.
  - **Green**: Correct letter in the correct position.
  - **Yellow**: Correct letter in the wrong position.
  - **Gray**: Incorrect letter.
  
- **Example**: If the solution is "berry" and the guess is "soare":
  - Feedback: `["gray", "yellow", "gray", "gray", "yellow"]`
  - This means 'o' and 'a' are incorrect, 's' and 'r' are in the word but in different positions, and 'e' is in the correct position.

#### Filtering Potential Words

- **filterWords(guess, feedback)**: This function filters the list of potential words based on the feedback.
  - For each potential word, it simulates the feedback that would be given if it were the solution.
  - If the simulated feedback matches the actual feedback, the word remains a potential solution.
  - Otherwise, the word is eliminated.

- **Example**: With feedback `["gray", "yellow", "gray", "gray", "yellow"]` from guessing "soare":
  - Potential words like "berry" would remain because they match the feedback.
  - Words like "apple" would be eliminated because they do not match the feedback.

#### Making Subsequent Guesses

- **makeGuess()**: This function selects the next guess from the filtered list of potential words.
  - Initially, the first guess is "soare".
  - Subsequent guesses are chosen from the filtered list to maximize the amount of information gained.

#### Iterative Guessing and Filtering

- **guessRow(row, callback)**: This function handles the process of making a guess, displaying feedback, and invoking the callback to proceed to the next row.
  - It ensures that each row is processed sequentially and waits for animations to complete before moving on.

- **startGuessing()**: This function initiates the guessing process by calling `guessNextRow`, which manages the sequential guessing of each row.

### Process

1. **Initial Guess**: The first guess is always "soare".
2. **Feedback and Filtering**: Feedback is received and potential words are filtered based on the feedback.
3. **Sequential Guessing**: The process continues row by row, making guesses, receiving feedback, and filtering potential words until the correct word is guessed or guesses run out.

## Theme Persistence

To persist the selected theme across page reloads:

### Functions

#### setTheme(theme)

Applies the selected theme and saves it to localStorage.

#### applySavedTheme()

Loads the saved theme from localStorage when the page loads and applies it.

### Event Listeners

- **DOMContentLoaded**: Applies the saved theme on page load.
- **Theme Buttons**: Saves the selected theme to localStorage.
- **Logo Button**: Reloads the page.

## Usage

1. Open `index.html` in a web browser.
2. Use the on-screen keyboard or physical keyboard to enter guesses.
3. Press "Enter" to submit a guess.
4. Change themes using the theme buttons.
5. Use the "Solve" button to automatically solve the game.

### Example

To run the solving functionality, click the "Solve" button. The game will start with the word "soare" and continue making guesses based on feedback until the correct word is guessed or guesses run out.

---

Enjoy playing and customizing Eldrow+!
