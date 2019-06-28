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
    
    //stores the lights lit so far by the game
    var sequence = [];
}

//functionality for when new game is pressed
function newGame() {
    var currentGame = new GameState();
}


//when called, 'light up' the sequence of lights created so far
//for the player to see
function lightSequence() {
    
    //light all the lights lit so far
    
    //light a random light
    //pick a random number between 1 and 4
    
    switch(Math.floor(Math.random()*4)+1){
        case 1:
            greenButton.style.backgroundColor = "#afffab";
            break;
        case 2:
            redButton.style.backgroundColor = "#ff8080";
            break;
        case 3:
            yellowButton.style.backgroundColor = "#fffd94";
            break;
        case 4:
            blueButton.style.backgroundColor = "#8383f7";
            break;
        
    }
    
    //store this new light in the sequence
    
}

lightSequence();