// variables and constants
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
const showGuessCount = document.querySelector(".showGuessCount");
let resetButton;
guessField.focus(); /*
    focus() methods automatically puts the text cursor inside the <input> text field as soon as the page loads
        */

let randomNumber = Math.floor(Math.random() * 1000) + 1;

guesses.textContent = "Your guesses: ";

// functions
function checkGuess() {
    const userGuess = Number(guessField.value); /*sets its value to the value inside the current value entered inside the text field.
        we run the code through the Numbers constructor to be sure that the entered value is a number*/

    guesses.textContent = `${guesses.textContent} ${userGuess} `;


    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = "!!!GAME OVER!!!";
        lowOrHi.textContent = "";
        setGameOver();
    } else {
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "Last guess was too low!";
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "Last guess was too high!";
        }
    }

    showGuessCount.textContent = `Anzahl benutzer Versuche: ${guessCount} `;
    guessField.value = "";
    guessCount++;
    guessField.focus();

}

guessSubmit.addEventListener("click", checkGuess); /* adding an event listener to the guessSubmit button. addEventListener() is a method, that takes two values (called arguments)
        1st: the type of event we are listening out for, in this case the click event as a string
        2nd: the code we want to run when the event occurs, in this case the checkGuess() function*/

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

/* resets everything to how it was at the start of the game */
function resetGame() {
    guessCount = 0;

    const resetParas = document.querySelectorAll(".resultParas p"); //selects all the paragraphs inside the div with the class .resultParas
    for (const resetPara of resetParas) {                           //code creates a variable containing a list of all the paragraphs inside <div class="resultParas"> 
        // using the querySelectorAll() method, then it loops through each one, removing the text content of each.
        resetPara.textContent = "";
    }

    resetButton.parentNode.removeChild(resetButton); //removes the reset button from the code

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * 100) + 1;
}
