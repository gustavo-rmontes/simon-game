// SIMON GAME

// Constants and global variables
const buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var gameStarted = false;
var lvlCounter = 0;
var userPressCounter = 0;

// Animations
function buttonAnimate(color){ // Buttons animation
    $("#"+color).addClass("pressed");

    // play sound
    let audio = new Audio("sounds/"+color+".mp3");
    audio.play();

    // remove "pressed"
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    }, 75);
}
function loserAnimate(){
    $("body").addClass("game-over");

    // play sound
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();

    // remove "pressed"
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
}

// Listeners
$("body").on("keydown", function(){ // Keys listener
    if(!gameStarted){
        setTimeout(startGame, 300);
    }
});

$(".btn").on("click", function(e){ // Buttons listener
    // identify, animate color and add it to the userPattern
    let buttonColor = e.currentTarget.id;
    buttonAnimate(buttonColor);
    userPattern.push(buttonColor);

    // verify sequence
    userPressCounter++;
    checkPatterns(userPressCounter);
});


function startGame(){
    gameStarted = true;
    gameSequence();
}

function gameSequence(){
    // reseting user pattern variables
    userPattern = [];
    userPressCounter = 0;

    // generating random color button to add to the game sequence
    let randomNumber = Math.floor(Math.random() * buttonColours.length);
    let randomColor = buttonColours[randomNumber];
    gamePattern.push(randomColor);   
    buttonAnimate(randomColor);

    // Change h1 title to level counter
    lvlCounter++;
    $("h1").text("Level " + lvlCounter); // change h1 to the game level
}

// Checks if the user's pattern is equal to the game's pattern
function checkPatterns(userPressCounter){
    let index = userPressCounter - 1;
    if(gamePattern[index] !== userPattern[index]){
        restartGame();
        return;
    }

    if(userPressCounter === lvlCounter){
        setTimeout(gameSequence, 750);
    }
}

function restartGame(){
    // Reset game variables
    gamePattern = [];
    lvlCounter = 0;
    loserAnimate();
    gameStarted = false;
}