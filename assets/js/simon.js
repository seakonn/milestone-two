//modal for rules button


//game needs a way of referring to the buttons in the HTML
const greenButton = document.getElementById("green-button");
const redButton = document.getElementById("red-button");
const yellowButton = document.getElementById("yellow-button");
const blueButton = document.getElementById("blue-button");


//game state object
//holds current sequence in a value
//holds current score in a value
function GameState() {
    var sequence = [];
}

//functionality for when new game is pressed
function newGame() {
    var currentGame = new GameState();
}


//when called, 'light up' the sequence of lights created so far
//for the player to see
function lightSequence() {
    
    
}