//Initializing variables
let grid = document.getElementsByClassName("grid");
let replay = document.getElementsByClassName("replay");
let playAgain = document.getElementsByClassName("playAgain");
let scoreDisplay = document.getElementsByClassName("scoreDisplay");
let left = document.getElementsByClassName("left");
let right = document.getElementsByClassName("right");
let up = document.getElementsByClassName("up");
let down = document.getElementsByClassName("down");
let width = 10;
let currentIndex = 0;
let foodIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;

//Creates a 100x100 game board
function createBoard() {
    replay.style.display = "none";
    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        grid.appendChild(div);
    }
}

//Reads user input for controlling the snake
function controls(e) {
    //Move to the right
    if (e.keycode === 39) {
        direction = 1;
    }
    //Move to the left
    else if (e.keycode === 37) {
        direction = -1;
    }
    //Move up
    else if (e.keycode === 38) {
        direction = -width;
    }
    else if (e.keycode === 40) {
        direction = +width;
    }
}

//User input from directly clicking the buttons
up.addEventListener("click", () => (direction = -width));
down.addEventListener("click", () => (direction = +width));
left.addEventListener("click", () => (direction = -1));
right.addEventListener("click", () => (direction = 1));

//Places a food pellet in a random location in the grid
function placeFood(squares) {
    do {
        //Check if the randomly selected location has part of the snake
        foodIndex = Math.floor(Math.random() * squares.length);
    } while (squares[foodIndex].classList.contains("snake"));
    //If it doesn't place a food pellet there
    squares[foodIndex].classList.add("food");
}

//Allows the snake to eat the food pellet and grow
function eatFood(squares, tail) {
    //Check if the current location of the snake has a food pellet
    if (squares[currentSnake[0]].classList.contains("food")) {
        //Remove the food pellet and add to the tail of the snake
        squares[currentSnake[0]].classList.remove("food");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        //Place a new food pellet in a random spot in the grid
        placeFood(squares);
        //Update the score
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime *= speed;
        interval = setInterval(moveOutcome, intervalTime);
    }
}

//Moves the snake based off of user input
function moveSnake(squares) {
    //Remove the tail (aka previous position of the snake)
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    //Place the snake in the new direction it just moved
    currentSnake.unshift(currentSnake[0] + direction);
    eatFood(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
}

//Checks if the snake made a collision
function checkForHits(squares) {
    if (
        (currentSnake[0] + width >= width * width && direction == width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        return true;
    }
    else {
        return false;
    }
}

//Determines the results of moving the snake
function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    //If the snake makes a collision, send an alert
    if (checkForHits(squares)) {
        alert("You hit something!");
        replay.style.display = "flex";
        return clearInterval(interval);
    }
    //Otherwise, just move the snake
    else {
        moveSnake(squares);
    }
}

//Places snake in game board and randomly places the food pellet
function startGame() {
    let squares = document.querySelectorAll(".grid div");
    placeFood(squares);
    direction = 1;
    scoreDisplay.innerHTML = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime);
}

//Restarts the game
function replayGame() {
    grid.innerHTML = "";
    createBoard();
    startGame();
    replay.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keyup", controls);
    createBoard();
    startGame();
    playAgain.addEventListener("click", replayGame);
})