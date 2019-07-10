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
    blinkLight(firstLight);

    //the rest of the lights light with a delay between them

    (function lightsLoop(position) {

        setTimeout(function() {

            //light the lights in sequence ...
            if (position > 0) {
                blinkLight(sequence[sequenceLength - position]);
            }
            //when we have lit them all, light a random one
            //assuming the random one hasn't already lit
            else if (!isRandomLit) {

                //light a random light
                blinkLight(randomNumber);

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
    
}


//gets input from the user via mouse clicks
function userResponse() {

    //ADD LISTENER TO GLOBAL SCOPE??- --------
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
    document.addEventListener("mouseup", function(event) {
        
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
    
    
    //must wait until the user has responded


    //delete the listeners when user input is finished



}

//what happens when the user clicks on a button
function userClicked(colour) {

    //show the light briefly
    console.log(colour);
    
}



lightSequence();

//userResponse();
