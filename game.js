// File: game.js

// Array to store the colors
var buttonColours = ["green", "red", "yellow", "blue"];

// Array to store the sequence of colors generated by the game
var gamePattern = [];

// Array to store the pattern of colors
var userClickedPattern = []; 

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

// Create a new variable called level and start at level 0.
var level = 0;


//  Start the Game
//  Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
    if (!started){
        $("#level-title").text("Level " + level);
        
        nextSequence();
        console.log("Game Started");
        started = true;
    }
});

// Check Which Button is Pressed
$(".btn").click(function(){
    var userChosenColour  = $(this).attr("id");
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

// Function to generate a Random number
function nextSequence(){
    level++;
    $('#level-title').text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    // To choose a Random Color from the Color Array
    var randomChosenColour = buttonColours[randomNumber];
    // Push the chosen color to the game pattern
gamePattern.push(randomChosenColour);
    // console.log(randomNumber);
    playSound(randomChosenColour);

    // Flash the button with the chosen color
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

}


// use Javascript to play the sound for the button colour selected 
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


//  Add Animations to User Clicks
function animatePress(currentColour){
    $("#" + currentColour).addClass('pressed');
    setTimeout(function() {
        $("#" + currentColour).removeClass('pressed');
    }, 100); 
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        // If the user got the most recent answer right, then check if the user has finished their sequence.
        if (userClickedPattern.length === gamePattern.length) {
            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        // Restart the game
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
