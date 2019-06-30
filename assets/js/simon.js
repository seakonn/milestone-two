//modal for rules button


//creating button objects to store values associated with them
//the refNumber uniquely identifies the button for use with any
//random numbers generated
//---DELETE REFNUMBER?-----

function SimonButton(normalClass, litClass) {
    
    this.normalClass = normalClass;
    this.litClass = litClass;
    this.divElement = document.getElementsByClassName(this.normalClass)[0];
}

//an array to store the button objects in
//the index of each array element corresponds to a number from the random
//number generator, so each colour can be identified
const buttons = [
    
    new SimonButton("green-button", "lit-green-button"),
    new SimonButton("red-button", "lit-red-button"),
    new SimonButton("yellow-button", "lit-yellow-button"),
    new SimonButton("blue-button", "lit-blue-button")
];



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
    
    
    /*
    var sequence1 = [0, 3, 1, 2, 1];
    //light all the lights lit so far
    //go through sequence array and call toggleLight
    for(var i=0; i++; i<sequence1.length) {
        toggleLight(numberToColour(sequence1[i]));

    }
    */
    //picks a random number between 1 and 4
    var randomNumber = Math.floor(Math.random()*4);
    
    
    //light a random light
    toggleLight(numberToColour(randomNumber));
    
    //store this new light in the sequence
    
}

//takes in a number between 0 and 3 and returns the 
//button object associated with that number
function numberToColour(num) {
    
    switch(num){
        case 0:
            return buttons[0];
            
        case 1:
            return buttons[1];
            
        case 2:
            return buttons[2];
            
        case 3:
            return buttons[3];
            
    }
}



//turns a single light briefly brighter then returns to its original colour
//it takes in an object conatining a HTML element, and the two classes
//which are to be alternately applied to the element
//it assumes that one of the classes supplied is already applied
function toggleLight(button) {
    
    
    //first turn the light on
    button.divElement.classList.toggle(button.normalClass);
    button.divElement.classList.toggle(button.litClass);
    
    //now toggle the light off, after a small time delay
    setTimeout(function() { button.divElement.classList.toggle(button.normalClass) }, 500);
    setTimeout(function() { button.divElement.classList.toggle(button.litClass) }, 500);
}

lightSequence();
