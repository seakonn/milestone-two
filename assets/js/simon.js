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
            toggleLight(greenButton, "green-button", "lit-green-button");
            break;
        case 2:
            toggleLight(redButton, "red-button", "lit-red-button");
            break;
        case 3:
            toggleLight(yellowButton, "yellow-button", "lit-yellow-button");
            break;
        case 4:
            toggleLight(blueButton, "blue-button", "lit-blue-button");
            break;
        
    }
    
    //store this new light in the sequence
    
}

//turns a single light briefly brighter then returns to its original colour
//it takes in an object conatining a HTML element, and the two classes
//which are to be alternately applied to the element
//it assumes that one of the classes supplied is already applied
function toggleLight(element, classOne, classTwo) {
    
    //first turn the light on
    element.classList.toggle(classOne);
    element.classList.toggle(classTwo);
    
    //now toggle the light off, after a small time delay
    setTimeout(function() { element.classList.toggle(classOne) }, 500);
    setTimeout(function() { element.classList.toggle(classTwo) }, 500);
}

lightSequence();