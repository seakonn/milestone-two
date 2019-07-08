//modal for rules button


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
    var sequence = [];
}

//functionality for when new game is pressed
function newGame() {
    var currentGame = new GameState();
}


//when called, 'light up' the sequence of lights created so far
//for the player to see and a random one at the end
//ASSUME LIGHTSEQ HAS AT LEAST ONE IN THE SEQUENCE
function lightSequence() {



    var sequence = [0, 1, 3, 2];
    //light all the lights lit so far
    //go through sequence array and call toggleLight
    var sequenceLength = sequence.length;

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
        firstLight = sequence[0];
    }


    //The first light in the sequence is lit without delay
    toggleLight(firstLight);

    //the rest of the lights light with a delay between them

    (function lightsLoop(position) {

        setTimeout(function() {

            //light the lights in sequence ...
            if (position > 0) {
                toggleLight(sequence[sequenceLength - position]);
            }
            //when we have lit them all, light a random one
            //assuming the random one hasn't already lit
            else if (!isRandomLit) {

                //light a random light
                toggleLight(randomNumber);

                //store this new light in the sequence
            }


            position--;

            if (position >= 0) {
                lightsLoop(position);
            }


        }, 1000);
    })(sequenceLength - 1);


    //RANDOM NUMBER NEEDS TO BE INSIDE LOOP LIGHTS CODE




}


//turns a single light briefly brighter then returns to its original colour
//it takes in a number, which is used to find its corresponding class
//it assumes that one of the classes supplied is already applied
function toggleLight(buttonNumber) {

    console.log("in togglelight");

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


    //first turn the light on
    currentButton.divElement.classList.toggle(currentButton.normalClass);
    currentButton.divElement.classList.toggle(currentButton.litClass);

    //now toggle the light off, after a small time delay
    setTimeout(function() { currentButton.divElement.classList.toggle(currentButton.normalClass) }, 500);
    setTimeout(function() { currentButton.divElement.classList.toggle(currentButton.litClass) }, 500);
}


//gets input from the user via mouse clicks
function userResponse() {

    //create some listeners for each of the buttons

    //event listeners don't play nice with loops :(
    /*
    for(var i in buttons) {
        console.log(i); //buttons[i].divElement
        document.addEventListener("mouseover", userClicked());
    }
    */

    document.addEventListener("click", function(e) {
        
    
        switch (e.target) {

            case buttons[0].divElement:
                console.log("green");
                break;

            case buttons[1].divElement:
                console.log("red");
                break;

            case buttons[2].divElement:
                console.log("yellow");
                break;

            case buttons[3].divElement:
                console.log("blue");
                break;


        }

    });


    //must wait until the user has responded


    //delete the listeners when user input is finished



}

//what happens when the user clicks on a button
function userClicked() {

    //show the light briefly
    console.log("CLICCCCK");
    toggleLight(0);

    //check
}



//lightSequence();

userResponse();
