/*
GAME RULES:

Challenge 1 - if a player rolls 6 2x in a row, his total score goes to 0 and it's next players turn;/this rule changes after 3rd challenge is implemented. Player loses his total score after he rolls the top dice 2x 6;
Challenge 2 - add an input field where players can choose the number to win;
Challenge 3 - add another dice. Player looses current score if any of the dices roll 1;

*/

let scores, roundScore, activePlayer;
let gamePlaying = true;
let lastDice;
init();

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {
        // 1. Random dice number
        let dice = Math.floor(Math.random() * 6) + 1;
        let dice1 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        const diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";
        const diceDOM1 = document.querySelector(".dice1");
        diceDOM1.style.display = "block";
        diceDOM1.src = "dice-" + dice1 + ".png";

        // 3. Update the round score
        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice !== 1 && dice1 !== 1) {
            // add score
            roundScore += dice + dice1;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        lastDice = dice;
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    const finalScore = parseInt(document.getElementById("final").value);
    if (gamePlaying) {
        // Add CURRENT score to a GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector("#score-" + activePlayer).textContent =
            scores[activePlayer];

        // Check if a player won the game
        if (scores[activePlayer] >= finalScore) {
            document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".dice1").style.display = "none";
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.add("winner");
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.remove("active");
            gamePlaying = false;

        } else {
            nextPlayer();
        }
    }
});


document.querySelector(".btn-new").addEventListener("click", init)

function nextPlayer() {
    // Next players turn
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice1").style.display = "none";
}



function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice1").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}