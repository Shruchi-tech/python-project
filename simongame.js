let buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var start=false;
var level=0;
var highest=0;

$(document).keypress(function () {
    if(!start){
        $("#level-title").text("Level " + level);

        nextSequence();
        start=true;
    }
})

$(".btn").click(function () {
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
     
     if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        if(gamePattern.length===userClickedPattern.length){
            
            setTimeout(function(){
             nextSequence();
            },1000)
        }
        
     }
     else{
        playsound("wrong");
        
        $("body").addClass("game-over");
         $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
           $("body").removeClass("game-over"); 
          
        },200);
        startOver();
       

     }
     
}

function nextSequence(){
    userClickedPattern=[];
    level= level+1;
   $("#level-title").text("Level " + level);


    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(" #"+randomChosenColour ).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
}
function animatePress(currentColor) {
    var c= $("#"+currentColor);
    c.addClass("pressed");
    setTimeout(function(){
      c.removeClass("pressed")
    },100);
}
function playsound(color) {
    var audio= new  Audio("./"+color+".mp3");
    audio.play();
}
function startOver() {
    var score=level-1;
      if(score>highest){
        highest=score;
        $(" #highest-tracker").text("Highest-Score:"+highest);
    }


    level=0;
    gamePattern=[];
    start=false;

   
}
    

