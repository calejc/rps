var userSelection;
var cpuSelection;
var cpuScore = 0;
var userScore = 0;
var cpuRandNum = 0; // random number variable for CPU selection function

// Define reset button to reset the scoreboard
function scoreReset(){
  $("#reset").click(function(){
      cpuScore = 0;
      userScore = 0;
      $("#userScore").html(userScore);
      $("#cpuScore").html(cpuScore);
      $(".display").html("");
      $(".lh").attr("src", "images/rockLH.png");
      $(".rh").attr("src", "images/rock.png");
      $(".hands img").animate({top:"0vw"}, {duration:300});
  });
}

// ================================= //
// CPU random selection is made;
// Both user's and CPU's hands have the image changed to match selection.
// Called later on animation completion,
// to have the image changed at end of Rock, Paper, Scissors countdown.
function selections(){
  // CPU //
  cpuRandNum = Math.floor((Math.random() * 3) + 1);
  if (cpuRandNum == 1){
    $(".lh").attr("src", "images/scissors.png");
    cpuSelection = "Scissors";
  }
  else if(cpuRandNum == 2){
    $(".lh").attr("src", "images/paperLH.png");
    cpuSelection = "Paper";
  }
  else if (cpuRandNum == 3){
    $(".lh").attr("src", "images/rockLH.png");
    cpuSelection = "Rock";
  }
  // User //
  if (userSelection == "Paper"){
    $(".rh").attr("src", "images/paperRH.png");
  }
  else if (userSelection == "Scissors"){
    $(".rh").attr("src", "images/scissorsRH.png");
  }
}

// ============================================================= //
// Add a flare animation for the winner to easily visualize who won
function cpuWin(){
  $(".lh").animate({width:"11.678263893vw", height:"10vw"}).promise().done(function(){
    $(".lh").animate({width:"8.75869792vw", height:"7.5vw"})
  });
}
function userWin(){
  $(".rh").animate({width:"11.678263893vw", height:"10vw"}).promise().done(function(){
    $(".rh").animate({width:"8.75869792vw", height:"7.5vw"})
  });
}

// ================================================ //
// Call selections() to get the CPU selection;
// Determine the winner of the round;
// Display the the result on the screen;
// Update the scoreboard;
function score(){
  selections();
  if (userSelection == "Rock"){
    if (cpuSelection == "Rock"){
      $(".display").html("TIE!");
    }
    else if (cpuSelection == "Paper"){
      ++cpuScore;
      cpuWin();
      $(".display").html("CPU Wins");
    }
    else if (cpuSelection == "Scissors"){
      ++userScore;
      userWin();
      $(".display").html("User Wins!");
    }
  }

  else if (userSelection == "Paper"){
    if (cpuSelection == "Paper"){
      $(".display").html("TIE!");
    }
    else if (cpuSelection == "Rock"){
      ++userScore;
      userWin();
      $(".display").html("User Wins!");
    }
    else if (cpuSelection == "Scissors"){
      ++cpuScore;
      cpuWin();
      $(".display").html("CPU Wins");
    }
  }

  else if (userSelection == "Scissors"){
    if (cpuSelection == "Scissors"){
      $(".display").html("TIE!");
    }
    else if (cpuSelection == "Paper"){
      ++userScore;
      userWin();
      $(".display").html("User Wins!");
    }
    else if (cpuSelection == "Rock"){
      ++cpuScore;
      cpuWin();
      $(".display").html("CPU Wins");
    }
  }
  // Update scoreboard
  $("#userScore").html(userScore);
  $("#cpuScore").html(cpuScore);
}

// ====================================================== //
// Hands move in a Rock, Paper, Scissors countdown animation,
// Upon animation completion, determine winner of the round by calling score()
function reset(){
  $(".hands img").animate({top:"0vw"}, {duration:300});
}
function countdown(){
  for (i=0;i<3;i++){
    $(".hands img").animate({top:"7vw"}, {duration:300});
    reset();
  };
  $(".hands img").animate({top:"7vw"}, {duration:300}).promise().done(function(){
    score();
  });
}

// ========= Reset the board =========== //
// Reset the displayed result div;
// Reset hand images to 'rock' in preparation for countdown again;
// Reset variable for CPU random number selection;
// Reset hands to the top position;
function resetBoard(){
  $(".display").html("");
  $(".rh").attr("src", "images/rock.png");
  $(".lh").attr("src", "images/rockLH.png");
  cpuRandNum = 0;
  $(".hands img").animate({top:"0vw"}, {duration:300});
}

// ============================================ //
// Start the round when user makes their selection
// Call resetBoard() to reset the board before each round.
// Call countdown() to play out the round.
function rps(){
  $(".button").click(function(){
    userSelection = ($(this).html());
    resetBoard();
    countdown();
  });
  scoreReset();
}
rps();

// ============================================== //
$(document).ready(function(){
  $("#user").val("");
  $("input").focus(function(){
    $(this).css("background-color", "#d9d9d9");
  });
  $("input").blur(function(){
    $(this).css("background-color", "#ffffff");
  });
  $("#formPage").submit(function(){
    var name = $("#user").val();
    var len = name.length;
    $(".buttons, .hands, .countdown, .container").show();
    $("#formPage").hide();
    if (len > 0)
    {
      $("#name").html(name);
    }
    return false;
  });
});
