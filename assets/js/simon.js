document.getElementById("new-game-button").addEventListener("click", function() {

    newGame();
});

document.addEventListener("mousedown", mouseDown);

document.addEventListener("touchstart", touchDown);

let isTouchScreen = false;

function mouseDown(e) {
    
    /** because a touch screen fires both touch and mouse events, 
     *  we do not want this code to run if the user is using a
     *  touch screen
     */
    if(!isTouchScreen) {
        
        downHandler(e);
    }
    
}

function touchDown(e) {
    
    isTouchScreen = true;
    
    downHandler(e);
    
}


function downHandler(event) {

   if(event === "touchstart") {
       isTouchScreen = true;
   }
   
    
    //button is only allowed to be pressed if the light sequence has finished
    if (game.allowUserInput) {

        //checks to see which button (if any) were pressed
        for(let i=0; i<buttons.length; i++) {
            
            if(event.target === buttons[i].divElement) {
                
                buttons[i].pressed = true;
                swapLitClass(i);
                break;
            }
        }
    }
}


document.addEventListener("mouseup", mouseUp);

document.addEventListener("touchend", touchUp);

function mouseUp(e) {
    
    /** because a touch screen fires both touch and mouse events, 
     *  we do not want this code to run if the user is using a
     *  touch screen
     */
    if(!isTouchScreen) {
        
        upHandler(e);
    }
    
}

function touchUp(e) {
    
    isTouchScreen = true;
    
    upHandler(e);
    
}


function upHandler(event) {

    if (game.allowUserInput) {


        for (let i = 0; i < buttons.length; i++) {

            if (buttons[i].pressed) {
                swapLitClass(i);
            }
        }

        let justClicked = 0;

        //checks to see which button (if any) were pressed
        for(let i=0; i<buttons.length; i++) {
            
            if(event.target === buttons[i].divElement) {
                
                justClicked = i;
                break;
            }
        } 


        //only trigger mouseup if there is a corresponding mousedown
        if (buttons[justClicked].pressed) {

            game.responses++;
            game.gameLost = checkAnswer(game, justClicked);

            if (game.gameLost) {
                exitGame(game);
            }

            if (game.roundWon) {

                document.getElementById("new-game-button").setAttribute("disabled", "");

                document.getElementById("current-score").innerHTML = game.sequence.length;

                game.allowUserInput = false;
                setTimeout(() => newRound(game), 1000);

            }
        }

        for(let i=0; i<buttons.length; i++) {
            
            buttons[i].pressed = false;
        }
    }
}


/** creating button objects to store values associated with them
 * the refNumber uniquely identifies the button for use with any
 * random numbers generated
 */
function SimonButton(normalClass, litClass) {

    this.normalClass = normalClass;

    this.litClass = litClass;

    this.divElement = document.getElementsByClassName(this.normalClass)[0];

    this.pressed = false;

}


/**an array to store the button objects in
 * the index of each array element corresponds to a number from the random
 * number generator, so each colour can be identified
 */
const buttons = [

    new SimonButton("green", "lit-green"),
    new SimonButton("red", "lit-red"),
    new SimonButton("yellow", "lit-yellow"),
    new SimonButton("blue", "lit-blue")
];


function GameState() {

    this.sequence = [];

    this.gameLost = false;

    this.roundWon = false;

    this.allowUserInput = false;

    this.responses = 0;

}

let game = {};


function newGame() {

    let startGameDelay = 1000;

    for(let i=0; i<4; i++) {
        
        blinkLight(i, startGameDelay);
    }
    
    checkHighScore();

    document.getElementById("current-score").innerHTML = "0";
    document.getElementById("game-over").innerHTML = "";
    document.getElementById("hs-alert").innerHTML = "";

    game = new GameState();

    document.getElementById("new-game-button").setAttribute("disabled", "");

    //start of game is delayed briefly, slightly longer than the lights are on for
    setTimeout(function() {

        newRound(game);

    }, 1.5 * startGameDelay);

}


/** when called, display the sequence of lights created so far
 * for the player to see and a random one at the end
 */ 
function lightSequence(currentgame) {

    //the duration in ms for how long each light is lit for
    let timeLit = 500;

    let sequenceLength = currentgame.sequence.length;

    let randomNumber = Math.floor(Math.random() * 4);

    let firstLight; 
    let isRandomLit = false; 

    if (sequenceLength === 0) {
        
        firstLight = randomNumber;
        isRandomLit = true;
    }

    else {
        
        firstLight = currentgame.sequence[0];
    }

    //the first light in the sequence lights without a delay
    blinkLight(firstLight, timeLit);

    /** the rest of the lights light with a delay between them
     * code for this function copied and modified from:
     * https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/
     */
    (function lightsLoop(position) {

        setTimeout(function() {

            if (position > 0) {
                blinkLight(currentgame.sequence[sequenceLength - position], timeLit);
            }
            
            else if (!isRandomLit) {

                blinkLight(randomNumber, timeLit);

            }

            position--;

            if (position >= 0) {
                lightsLoop(position);
            }

        }, 1000);
        
    })(sequenceLength - 1);

    currentgame.sequence.push(randomNumber);

}


/** turns a light from its normal state to its lit state, or vice versa
 * it takes in a number, which is used to find its corresponding class
 * it assumes that one of the classes supplied is already applied
 */ 
function swapLitClass(buttonNumber) {

    let currentButton;
    
    for(let i=0; i<buttons.length; i++) {
        
        if(buttonNumber === i) {
            
            currentButton = buttons[i];
        }
    }
    
    currentButton.divElement.classList.toggle(currentButton.normalClass);
    currentButton.divElement.classList.toggle(currentButton.litClass);

}


/** turns a light on then off again,
 * takes in the number of the light to blink, as well as the length of
 * time the light is to stay lit.
 */
function blinkLight(buttonNum, duration) {

    swapLitClass(buttonNum);
    setTimeout(function() {

        swapLitClass(buttonNum);

    }, duration);

}


/** checks the users input so far against the stored
 * answer. Returns true if correct, false if incorrect.
 */
function checkAnswer(currentgame, button) {

    if (currentgame.sequence[currentgame.responses - 1] !== button) {

        return true;
    }

    else

        if (currentgame.responses === currentgame.sequence.length) {

            currentgame.roundWon = true;
            return false;
        }
}


/** this function starts a new round of lights and allows the player to respond to them
 */
function newRound(currentgame) {

    currentgame.responses = 0;
    currentgame.roundWon = false;

    lightSequence(currentgame);

    /** need to know when the lights have finished displaying
     * sequence finished after (X*1000) - 500 milliseconds where X is sequence length
     */
    setTimeout(function() {

        document.getElementById("new-game-button").removeAttribute("disabled");

        currentgame.allowUserInput = true;

    }, ((currentgame.sequence.length) * 1000) - 500);

}


function exitGame(currentgame) {

    currentgame.allowUserInput = false;

    document.getElementById("game-over").innerHTML = "GAME OVER";
    checkHighScore();
}


function checkHighScore() {

    let currentScore = parseInt(document.getElementById("current-score").innerHTML);
    let highScore = parseInt(document.getElementById("high-score").innerHTML);


    if (currentScore > highScore) {

        document.getElementById("high-score").innerHTML = currentScore;
        document.getElementById("hs-alert").innerHTML = "NEW HIGH SCORE!";

    }
}
