var flag = 0;
var permision = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = -1;
alert("Welcome into Simon game, Do you think you have a good memory ?, all you need to do is to remember the sequence at each level and show us how many levels you will survive, Enjoy !");
/* First we check if a button is pressed to start the game */
$(document).keydown(function(event) {
  if (flag == 0) {
    flag = 1;
    nextSequence();
  }
});

/* checking which color button is pressed  */
$(".btn").click(function(event) {
  var userChosenColour = this.id; // "this" gets "btn" caused the event the "id" gets which btn caused it
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  if( userClickedPattern.length == ( level + 1 ) )
  {
      CheckerFunction();
  }
});


/* The functions that generates the random color sequence */
function nextSequence() {
  level++;
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  setTimeout(function(){
    $("#" + randomChosenColour).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);
  },500);
}

/* Checker function to validate the answer */
function CheckerFunction() {
  var erroFlag ;
  for (var i = 0; i < gamePattern.length; i++)
  {
    if (gamePattern[i] == userClickedPattern[i])
    {
      erroFlag = 0;
    }
    else
    {
      erroFlag = 1 ;
      break;
    }
  }
  if ( erroFlag == 0 )
  {
    nextSequence();
    userClickedPattern = [];
  }
  else
  {
    $("#level-title").html(" Game Over !, Press any key to restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    playSound("wrong");
    gamePattern = [];
    userClickedPattern = [];
     level = -1;
    flag = 0;
  }
}

/* Function responsible for playing the sound corresponding to the pressed color */
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}


/* Function responsible for animating the background of the random color selected  */
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
