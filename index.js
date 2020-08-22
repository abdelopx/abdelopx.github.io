var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function(){
    if (!started) {
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){

 var choosenColor = $(this).attr("id");
 userClickedPattern.push(choosenColor);
 playSound(choosenColor);
 animatePress(choosenColor);

 checkAnswer(userClickedPattern.length-1);

});

function playSound(name) {
var audio = new Audio("sounds/"+ name + ".mp3");
audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    },100);
}

// Function that starts the sequence of each round (Level)
function nextSequence() {
userClickedPattern = [];
level++;
$("#level-title").text("Level " + level);

var randomNumber = Math.floor(Math.random() *4);
var randomColour = buttonColours[randomNumber];
gamePattern.push(randomColour);

$("#"+randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomColour);

}


//Function that compares the pattern of the user with the generated pattern of the game.
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");

        if (userClickedPattern.length===gamePattern.length) {
        setTimeout(function() {
            nextSequence();
        },1000);
    }
}
    else {
        console.log("Wrong");
        //Create instance of Audio
        var audio = new Audio("sounds/wrong.mp3");
        //Using the play() method to play sound if the userClickedPattern do not match the gamePattern.
        audio.play();

        $("body").addClass("game-over")

        setTimeout(function() {
         $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
  
//Function that resets the level/gamePattern/started variables.
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $("#level-title").text("Press Any Key to Restart");        
  }
