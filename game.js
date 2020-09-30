var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];
function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
  var randomNumber = Math.random() * 4;
  var randomNumberFinal = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumberFinal];
  gamePattern.push(randomChosenColour);
  var button = $("#" + randomChosenColour);
  button.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress($(this));
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  console.log(gamePattern);
  checkAnswer(userClickedPattern.length - 1);
});
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour) {
  currentColour.addClass("pressed");
  setTimeout(function () {
    currentColour.removeClass("pressed");
  }, 100);
}
$(document).on("keypress", function () {
  if (!started) {
    nextSequence();
    started=true;
  }
});
function checkAnswer(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    if (userClickedPattern.length === gamePattern.length)
      setTimeout(function () {
        nextSequence();
      }, 1000);
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver(){
  started=false;
  level=0;
  gamePattern=[];
}
