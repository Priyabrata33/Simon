// $('document').ready(function(){
//     alert("helow");
// });
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var n = 0;
var started = false;


$(document).keypress(function(event){
    if(!started){
        $("h1").text("Level "+ ++n);
        nextSequence();
        started = true;
    }
});



//
var userClickPartern = [];
$(".btn").click(function(){
    var userChosenColour  = $(this).attr("id");
    userClickPartern.push(userChosenColour);
    activity(userChosenColour);
    checkAnswer(userClickPartern.length-1);
       
});
function nextSequence(){
    userClickPartern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var  randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    plaSound(randomChosenColour);

    
    $("h1").text("Level "+ n);
    n++;
    
    
}

function activity(userChosenColour){

    animatePress(userChosenColour);
    plaSound(userChosenColour);
}


function animatePress(temp){
    $("#" + temp).addClass("pressed");

    setTimeout(function(){
        $("#" + temp). removeClass("pressed");
    },100);
}

function plaSound(temp){
    var audio = new Audio("sounds/" + temp + ".mp3");
    audio.play();
}


    if(n==userClickPartern.length){
        checkAnswer();
    }

function checkAnswer(curLevel){
    if(started){
    if(userClickPartern[curLevel]==gamePattern[curLevel]){
        console.log("success");
        if(userClickPartern.length==gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }else{
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        
        $(document).keypress(function(event){
            $("h1").text("Press A Key to Start");
           location.reload();
        });
        n = 0;
        gamePattern = [];
        started = false;

    }
}

}



