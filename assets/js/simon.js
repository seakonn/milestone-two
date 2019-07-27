//want know when new game button is pressed

document.getElementById("new-game-button").addEventListener("click", function() {

    newGame();
});


//when the mouse button is depressed, the colour changes to lit state
document.addEventListener("mousedown", function(event) {

    //button is only allowed to be pressed if the light sequence has finished
    if (game.allowUserInput === true) {


        //checks to see which button (if any) were pressed
        switch (event.target) {

            //green button was clicked
            case buttons[0].divElement:
                buttons[0].pressed = true;
                toggleLight(0);
                break;

                //red button was clicked
            case buttons[1].divElement:
                buttons[1].pressed = true;
                toggleLight(1);
                break;

                //yellow button was clicked
            case buttons[2].divElement:
                buttons[2].pressed = true;
                toggleLight(2);
                break;

                //blue button was clicked
            case buttons[3].divElement:
                buttons[3].pressed = true;
                toggleLight(3);
                break;

        }
    }

});


//when the mouse button is released, colour goes back to normal
//checks to see if the user clicked the right button in the sequence
document.addEventListener("mouseup", function(event) {

    if (game.allowUserInput === true) {


        //want the colour to change back regardless of where mouseup occurs
        //if green pressed, toggle green etc
        for (var i = 0; i < buttons.length; i++) {

            if (buttons[i].pressed === true) {
                toggleLight(i);
            }
        }


        //checks to see which button (if any) were pressed
        switch (event.target) {

            //green button was clicked
            case buttons[0].divElement:
                //only trigger mouseup if there is a corresponding mousedown
                if (buttons[0].pressed === true) {


                    game.responses++;
                    game.gameLost = checkAnswer(game, 0);

                    if (game.gameLost) {
                        exitGame(game);
                    }

                    if (game.roundWon) {
                        setTimeout(() => newRound(game), 1000);
                        
                    }

                }



                break;

                //red button was clicked
            case buttons[1].divElement:
                //only trigger mouseup if there is a corresponding mousedown
                if (buttons[1].pressed === true) {


                    game.responses++;
                    game.gameLost = checkAnswer(game, 1);

                    if (game.gameLost) {
                        exitGame(game);
                    }

                    if (game.roundWon) {
                        setTimeout(() => newRound(game), 1000);
                        
                    }

                }



                break;

                //yellow button was clicked
            case buttons[2].divElement:
                //only trigger mouseup if there is a corresponding mousedown
                if (buttons[2].pressed === true) {


                    game.responses++;
                    game.gameLost = checkAnswer(game, 2);

                    if (game.gameLost) {
                        exitGame(game);
                    }

                    if (game.roundWon) {
                        setTimeout(() => newRound(game), 1000);
                        
                    }

                }



                break;

                //blue button was clicked
            case buttons[3].divElement:
                //only trigger mouseup if there is a corresponding mousedown
                if (buttons[3].pressed === true) {


                    game.responses++;
                    game.gameLost = checkAnswer(game, 3);

                    if (game.gameLost) {
                        exitGame(game);
                    }

                    if (game.roundWon) {
                        setTimeout(() => newRound(game), 1000);
                        
                    }

                }



                break;


        } //end switch

        //reset the pressed variables
        buttons[0].pressed = false;
        buttons[1].pressed = false;
        buttons[2].pressed = false;
        buttons[3].pressed = false;


    }

});



//creating button objects to store values associated with them
//the refNumber uniquely identifies the button for use with any
//random numbers generated
function SimonButton(normalClass, litClass) {

    //the css class for a button's normal colour
    this.normalClass = normalClass;

    //the css class for a button's lit colour
    this.litClass = litClass;

    //the corresponding div for the button
    this.divElement = document.getElementsByClassName(this.normalClass)[0];

    //only assigned true if a mousedown event occurs on the button
    this.pressed = false;
    
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


function GameState() {

    //stores the lights lit so far by the game
    this.sequence = [];

    //game is not lost until the player makes a mistake
    this.gameLost = false;

    //the status of the current round
    //only assigned to true if user gets all answers correct in a round
    //then its value is reset
    this.roundWon = false;

    //user is only allowed to click buttons after the lights have finished lighting
    this.allowUserInput = false;
    
    //this records the number of responses a player has made
    //for the current round
    this.responses = 0;


}

//used to refer to the current game state
var game = null;

//functionality for when new game is pressed
function newGame() {

    game = new GameState();

    newRound(game);
    
}


//when called, display the sequence of lights created so far
//for the player to see and a random one at the end
function lightSequence(currentgame) {

    //the duration in ms for how long each light is lit for
    var timeLit = 500;

    //light all the lights lit so far
    //go through sequence array and call toggleLight
    var sequenceLength = currentgame.sequence.length;

    //picks a random number between 1 and 4
    var randomNumber = Math.floor(Math.random() * 4);

    var firstLight; //will be initilised shortly
    var isRandomLit = false; //will only change if this is the first iteration

    //If this is the first round of the game, the first light
    //will be random
    if (sequenceLength === 0) {
        firstLight = randomNumber;
        isRandomLit = true;
    }

    //otherwise the first light is the first element
    //in the array
    else {
        firstLight = currentgame.sequence[0];
    }


    //The first light in the sequence is lit without delay
    blinkLight(firstLight, timeLit);

    //the rest of the lights light with a delay between them

    (function lightsLoop(position) {

        setTimeout(function() {

            //light the lights in sequence ...
            if (position > 0) {
                blinkLight(currentgame.sequence[sequenceLength - position], timeLit);
            }
            //when we have lit them all, light a random one
            //assuming the random one hasn't already lit
            else if (!isRandomLit) {

                //light a random light
                blinkLight(randomNumber, timeLit);

                //store this new light in the sequence
            }


            position--;

            if (position >= 0) {
                lightsLoop(position);
            }


        }, 1000);
    })(sequenceLength - 1);


    //add the random light to the current sequence of lights
    currentgame.sequence.push(randomNumber);

}


//turns a light from its normal state to its lit state, or vice versa
//it takes in a number, which is used to find its corresponding class
//it assumes that one of the classes supplied is already applied
function toggleLight(buttonNumber) {


    var currentButton;

    //this passes in the number and assigns currentButton
    //to the button associated with it
    switch (buttonNumber) {
        case 0:
            currentButton = buttons[0]; //green button
            break;

        case 1:
            currentButton = buttons[1]; //red button
            break;

        case 2:
            currentButton = buttons[2]; //yellow button
            break;

        case 3:
            currentButton = buttons[3]; //blue button
            break;

    }


    //removes the normal class and adds the light class instead
    currentButton.divElement.classList.toggle(currentButton.normalClass);
    currentButton.divElement.classList.toggle(currentButton.litClass);

}


//turns a light on then off again, 
//takes in the number of the light to blink, as well as the length of 
//time the light is to stay lit.
function blinkLight(buttonNum, duration) {

    toggleLight(buttonNum);
    setTimeout(function() {

        toggleLight(buttonNum);

    }, duration);

}


//checks the users input so far against the stored
//answer. Returns true if correct, false if incorrect.
function checkAnswer(currentgame, button) {

    console.log("first el = " + currentgame.sequence[0]);
    
    //if the button just clicked is not the next one in the sequence
    //then answer was incorrect, the game is over
    if (currentgame.sequence[currentgame.responses - 1] !== button) {

        return true;
    }

    else

        //if we have the same number of responses as sequence
        //all answers must have been correct
        //start new round
        if (currentgame.responses === currentgame.sequence.length) {

            currentgame.roundWon = true;
            return false;
        }
}


//this function starts a new round of lights and allows the player to respond to them
function newRound(currentgame) {


    //reset these variables at the start of a new round
    var numOfClicks = 0;
    currentgame.roundWon = false;
    currentgame.allowUserInput = false;


    //display the sequence of lights so far
    lightSequence(currentgame);


    //need to know when the lights have finished displaying
    //sequence finished after (X*1000) - 500 milliseconds where X is sequence length
    setTimeout(function() {

        currentgame.allowUserInput = true;

    }, ((currentgame.sequence.length) * 1000) - 500);

}


//exits THE GAME
function exitGame(currentgame) {

    currentgame.allowUserInput = false;
    console.log("GAME OVER");
}
