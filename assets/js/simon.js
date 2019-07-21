//want know when new game button is pressed

document.getElementById("new-game-button").addEventListener("click", function() {

    newGame();
});

//creating button objects to store values associated with them
//the refNumber uniquely identifies the button for use with any
//random numbers generated


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
    this.sequence = [];

    //game is not lost until the player makes a mistake
    this.gameLost = false;
    
    //the status of the current round
    //only assigned to true if user gets all answers correct
    //then its value is reset
    this.roundWon = false;


}

//functionality for when new game is pressed
function newGame() {

    var game = new GameState();

    newRound(game);

}


//when called, 'light up' the sequence of lights created so far
//for the player to see and a random one at the end
//passes in the current sequence of lights
function lightSequence(currentgame) {




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
    blinkLight(firstLight, 500);

    //the rest of the lights light with a delay between them

    (function lightsLoop(position) {

        setTimeout(function() {

            //light the lights in sequence ...
            if (position > 0) {
                blinkLight(currentgame.sequence[sequenceLength - position], 500);
            }
            //when we have lit them all, light a random one
            //assuming the random one hasn't already lit
            else if (!isRandomLit) {

                //light a random light
                blinkLight(randomNumber, 500);

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

        toggleLight(buttonNum)

    }, duration);

}


//gets input from the user via mouse clicks
//buttons are activated when this function is called
function userResponse(currentgame) {

    var numOfAnswers = 0;

    //when the mouse button is depressed, the colour changes to lit state
    document.addEventListener("mousedown", function(event) {

        //checks to see which button (if any) were pressed
        switch (event.target) {

            //green button was clicked
            case buttons[0].divElement:
                toggleLight(0);
                break;

                //red button was clicked
            case buttons[1].divElement:
                toggleLight(1);
                break;

                //yellow button was clicked
            case buttons[2].divElement:
                toggleLight(2);
                break;

                //blue button was clicked
            case buttons[3].divElement:
                toggleLight(3);
                break;

        }

    });


    //when the mouse button is released, colour goes back to normal
    //checks to see if the user clicked the right button in the sequence
    document.addEventListener("mouseup", function(event) {

        //checks to see which button (if any) were pressed
        switch (event.target) {

            //green button was clicked
            case buttons[0].divElement:
                toggleLight(0);
                numOfAnswers++;
                currentgame.gameLost = checkAnswer(currentgame, numOfAnswers, 0);
                break;

                //red button was clicked
            case buttons[1].divElement:
                toggleLight(1);
                numOfAnswers++;
                currentgame.gameLost = checkAnswer(currentgame, numOfAnswers, 1);
                break;

                //yellow button was clicked
            case buttons[2].divElement:
                toggleLight(2);
                numOfAnswers++;
                currentgame.gameLost = checkAnswer(currentgame, numOfAnswers, 2);
                break;

                //blue button was clicked
            case buttons[3].divElement:
                toggleLight(3);
                numOfAnswers++;
                currentgame.gameLost = checkAnswer(currentgame, numOfAnswers, 3);
                break;


        }
    });

    //delete the listeners when user input is finished
}


//checks the users input so far against the stored
//answer. Returns true if correct, false if incorrect.
function checkAnswer(currentgame, clicks, button) {


    //if the button just clicked is not the next one in the sequence
    //then the game is over
    if (currentgame.sequence[clicks - 1] !== button) {
        console.log("WRONG");
        
        return true;
    }

    else

        //if we have the same number of clicks as answers
        //all answers must have been correct
        //start new round
        if (clicks === currentgame.sequence.length) {
            console.log("ALL ANSWERS CORRECT");
            currentgame.roundWon = true;
            return false;
        }
}


//this function starts a new round of lights, and player response to those lights
//it will keep calling itself until the player gets an answer wrong
async function newRound(currentgame) {

    //reset this variable at the start of a new round
    currentgame.roundWon = false;
    
    //promise ensures that the buttons will not be activated until the lights
    //have finished displaying
    var lightsFinished = new Promise(function(resolve, reject) {

        //display the sequence of lights so far
        lightSequence(currentgame);

        //need to know when the lights have finished displaying
        //sequence finished after (X*1000) - 500 milliseconds where X is sequence length
        //when finished, promise is resolved
        setTimeout(function() {

            resolve();

        }, ((currentgame.sequence.length) * 1000) - 500);

    });

    //wait until the light have finished
    await lightsFinished;

    //allow the user to respond
    var roundComplete = new Promise(function(resolve, reject) {


        userResponse(currentgame);
        
        
        if (currentgame.roundWon === true) {
            resolve(true);
        }
        
        if(currentgame.gameLost === true) {
            reject(false);
        }
        

    });


    //wait for response to finish
    await roundComplete;

    //if response correct, function calls itself again
    //RESPONSE CORRECT WHEN ??? ROUNDWON = TRUE
    //if response incorrect, exit out of function, end game
    //RESPONSE INCORRECT WHEN ANSWER = INCORRECT
    if (roundComplete === true) {

        //user successfully finished the round
        //start a new one
        newRound(currentgame);

    }
    else {

        //user failed the round, game over
        exitGame();

    }

}

function exitGame () {
    console.log("GAME OVER");
}
