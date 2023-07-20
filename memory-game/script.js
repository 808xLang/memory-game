const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

//time start
let seconds = 0,
    minutes = 0;
//moves
let movesCount = 0,
    winCount = 0;
//timer count
const timeGenerator = () => {
    seconds += 1;
    //how to make a timer
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    //format time before displaying this logic
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//how many moves
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

const gameContainer = document.getElementById("game");

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);
        newDiv.value = color;

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);

        // append the div to the element with an id of game
        gameContainer.append(newDiv);
    }
}

// checks all the flipped cards and returns the number of flipped cards that do not match
const unmatchingFlippedCardsCount = () => {
    let flipped = {};
    // loops through all the cards
    for (const card of cards.children) {
        // if the current card is flipped
        if (card.classList.contains("flipped")) {
            // debugger;
            // if the flipped card color does NOT have a matching flipped card add it to flipped
            if (!flipped[card.value]) {
                // set the value to 1
                flipped[card.value] = 1;
            } else {
                // if the flipped card color DOES have a matching flipped card remove it from flipped
                delete flipped[card.value];
            }
        }
    }
    // debugger;
    console.log({ unmatchingFlippedCardsCount: Object.keys(flipped) });
    return Object.keys(flipped).length;
};

// TODO: Implement this function!
function handleCardClick(event) {
    // you can use event.target to see which element was clicked

    let unmathcing = unmatchingFlippedCardsCount()
    console.log({unmathcing})
    if (
        unmathcing > 1 ||
        event.target.classList.contains("flipped")
    ) {
        console.log("WAIT UNTIL CARDS DISAPPEAR")
        return;
    }

    let selectedColor = event.target.className;
    event.target.style.backgroundColor = selectedColor;

    movesCounter();
    let currentCard = event.target;
    currentCard.style.backgroundColor = currentCard.classList[0];

    if (!card1 || !card2) {
        currentCard.classList.add("flipped");
        card1 = card1 || currentCard;
        card2 = currentCard === card1 ? null : currentCard;
    }

    if (card1 && card2) {
        noClicking = true;
        // debugger
        let gif1 = card1.className;
        let gif2 = card2.className;

        if (gif1 === gif2) {
            cardsFlipped += 2;
            card1.removeEventListener("click", handleCardClick);
            card2.removeEventListener("click", handleCardClick);
            card1 = null;
            card2 = null;
            noClicking = false;
        } else {
            setTimeout(function () {
                card1.style.backgroundColor = "";
                card2.style.backgroundColor = "";
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1 = null;
                card2 = null;
                noClicking = false;
            }, 1000);
        }
    }

    if (cardsFlipped === COLORS.length) {
        alert(`You win it only took ${movesCount} moves!`);
        clearInterval(interval);
    }
}

cards = document.querySelector("#game");

// gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

//start game
startButton.addEventListener("click", () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    //controls amd button visib
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    //Start timer
    interval = setInterval(timeGenerator, 1000);

    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    // shuffle(array);
});

//Stop Game
stopButton.addEventListener("click", () => {
    movesCount = 0;
    time = 0;
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    // NEED TO FIGURE OUT A WAY TO RESET THE CARDS
    clearInterval(interval);
});

function oaat(event) {
    if (event.target.className == event.target.className)
        console.log("it works");
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */
