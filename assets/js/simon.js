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
//for the player to see
//ASSUME LIGHTSEQ HAS AT LEAST ONE IN THE SEQUENCE
function lightSequence() {



    var sequence = [0, 1, 2, 3];
    //light all the lights lit so far
    //go through sequence array and call toggleLight
    var sequenceLength = sequence.length;


    //The first light in the sequence is lit without delay

    toggleLight(sequence[0]);


    //the rest of the lights light with a delay between them

    (function lightsLoop(position) {

        setTimeout(function() {

            //light the lights in sequence ...
            if (position > 0) {
                toggleLight(sequence[sequenceLength - position]);
            }
            //when we have lit them all, light a random one
            else {
               
                //picks a random number between 1 and 4
                var randomNumber = Math.floor(Math.random() * 4);

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

lightSequence();
