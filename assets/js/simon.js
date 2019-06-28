//modal for rules button


//game needs a way of referring to the buttons in the HTML
const greenButton = document.getElementsByClassName("green-button")[0];
const redButton = document.getElementsByClassName("red-button")[0];
const yellowButton = document.getElementsByClassName("yellow-button")[0];
const blueButton = document.getElementsByClassName("blue-button")[0];


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
            greenButton.classList.toggle("lit-green-button");
            greenButton.classList.toggle("green-button");
            break;
        case 2:
            redButton.classList.toggle("lit-red-button");
            redButton.classList.toggle("red-button");
            break;
        case 3:
            yellowButton.classList.toggle("lit-yellow-button");
            yellowButton.classList.toggle("yellow-button");
            break;
        case 4:
            blueButton.classList.toggle("lit-blue-button");
            blueButton.classList.toggle("blue-button");
            break;
        
    }
    
    //store this new light in the sequence
    
}

lightSequence();