//modal for rules button


//create button objects

const greenButton = {
    normalClass: "green-button",
    litClass: "lit-green-button",
    divElement: document.getElementsByClassName(this.normalClass)[0],
    refNumber: 0
    
};

const redButton = {
    normalClass: "red-button",
    litClass: "lit-red-button",
    divElement: document.getElementsByClassName(this.normalClass)[0],
    refNumber: 1
    
};

const yellowButton = {
    normalClass: "yellow-button",
    litClass: "lit-yellow-button",
    divElement: document.getElementsByClassName(this.normalClass)[0],
    refNumber: 2
    
};

const blueButton = {
    normalClass: "blue-button",
    litClass: "lit-blue-button",
    divElement: document.getElementsByClassName(this.normalClass)[0],
    refNumber: 3
    
};


//game needs a way of referring to the buttons in the HTML
/*
const greenButton = document.getElementsByClassName("green-button")[0];
const redButton = document.getElementsByClassName("red-button")[0];
const yellowButton = document.getElementsByClassName("yellow-button")[0];
const blueButton = document.getElementsByClassName("blue-button")[0];
*/

//the order of this array is important as position will correspond to the 
//random numbers being generated for the lights

const buttons = [greenButton, redButton, yellowButton, blueButton];
const colours = ["green", "red", "yellow", "blue"];


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
    
    var sequence = [1, 3, 4, 2, 4];
    //light all the lights lit so far
    //go through sequence array and call toggleLight
    for(var i=0; i++; i<sequence.length) {
        toggleLight(buttons[sequence[i]], );
    }
    
    //picks a random number between 1 and 4
    var randomNumber = Math.floor(Math.random()*4)+1;
    
    
    //light a random light
    switch(randomNumber){
        case 1:
            toggleLight(buttons[0], "green-button", "lit-green-button");
            break;
        case 2:
            toggleLight(buttons[1], "red-button", "lit-red-button");
            break;
        case 3:
            toggleLight(buttons[2], "yellow-button", "lit-yellow-button");
            break;
        case 4:
            toggleLight(buttons[3], "blue-button", "lit-blue-button");
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