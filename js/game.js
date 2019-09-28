var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.round((Math.random())*3);
  var randomChosenColour = buttonColours[randomNumber];  
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animateClass(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  
});

function playSound(colorName) {
  var audio = new Audio("sounds/"+colorName+".mp3")
  audio.play();
}

function animateClass(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, 100)
}

function start() {
  level = 0;
  $(document).keydown(function() {
    if (!started) {
      nextSequence()
      $("#level-title").text("Level "+level);
      started = true;
    }
  });
}
start();

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {

    if (userClickedPattern.length === gamePattern.length) {
      yesTrue();
    }
  
  } else {
    wrong();
  }
}

function yesTrue() {
  setTimeout(function() {
    nextSequence();
  }, 1000);
}

function wrong() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  started = false;
  gamePattern = [];
  start();
}









