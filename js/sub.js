var game;
var lang = "pl";
var who_plays; // c - computer, p - player
var startPanel;
var statusPanel;
var ballsNumber = 12;
var currentBallsNumber = ballsNumber;
var ballsMoveNbr = 2;
var currentBalls;
var bomb;
var ballSrc = 'img/beach-ball-4.png';
var ballInvSrc = 'img/beach-ball-4inv.png';
var ballCmpSrc = 'img/beach-ball-4cmp.png';
var bombSrc = 'img/bomb.png';
var gameBalls;

function bombMouseoutHandler() {
    currentBalls[currentBalls.length - 1].className = 'ball';
    for (var i = 0; i < currentBalls.length - 1; i = i + 1) {
      currentBalls[i].src = ballSrc;
    }
    updatePanelChoice(0);
}

function bombMouseoverHandler() {
    currentBalls[currentBalls.length - 1].className = 'ball96';
    for (var i = 0; i < currentBalls.length - 1; i = i + 1) {
      currentBalls[i].src = ballInvSrc;
    }
    updatePanelChoice(currentBalls.length);
}

function ballMouseoutHandler() {
    var i = 0;
    while (currentBalls[i] != this) {
      currentBalls[i].src = ballSrc;
      i = i + 1;
    }
    this.src = ballSrc;
    updatePanelChoice(0);
}

function ballMouseoverHandler() {
    var i = 0;
    while (currentBalls[i] != this) {
      currentBalls[i].src = ballInvSrc;
      i = i + 1;
    }
    this.src = ballInvSrc;
    updatePanelChoice(i+1);
}

function ballClickHandler() {
  //if (currentBalls[0] == this) alert('I am 1st ball!');
  //if (currentBalls[1] == this) alert('I am 2nd ball!');
  var i = 0;
  while (currentBalls[i] != this) {
    i = i + 1;
  }
    chooseBalls(i+1);
}

function prepareGame(gameDiv, language) {
  game = gameDiv;
  lang = language;
  //alert(game.id);
}

function startGame(first) {
  if (first == 0) {
    who_plays = 'c';
  } else {
    who_plays = 'p';
  }
  vStatusPanelTitle = document.getElementById('gameStatusTitle');
  vStatusPanelInfo = document.getElementById('gameStatusInfo');
  vStatusPanelChoice = document.getElementById('gameStatusChoice');
  startPanel = document.getElementById('startPanel');
  ballsNumber = Number(document.getElementById('totalBallsNbr').value);
  currentBallsNumber = ballsNumber;
  ballsMoveNbr = Number(document.getElementById('ballsMoveNbr').value);
  game.removeChild(startPanel);
  gameBalls = document.getElementById('balls-col');
  currentBalls = new Array(ballsNumber);
  for (var i = 1; i < ballsNumber; i++) {
    var tmpBall = createBall();
    gameBalls.appendChild(tmpBall);
    currentBalls[i-1] = tmpBall;
  }
  bomb = createBomb();
  gameBalls.appendChild(bomb);
  currentBalls[ballsNumber-1] = bomb;
  //while (currentBalls.length > 0) {  // game end condition
    if (who_plays == 'c') computerMoves();
    else if (who_plays == 'p') playerMoves();
  //}


  //alert(currentBalls[0].tagName);
  //alert(currentBalls.length);
}

function createBall() {
  var ball = new Image();
  ball.src = ballSrc;
  ball.classList.add('ball');
  return ball;
}

function createBomb() {
  var bomb = new Image();
  bomb.src = bombSrc;
  bomb.classList.add('ball');
  return bomb;
}

function endTurn() {
  if (who_plays == 'p') {
    if (currentBalls.length == 0) {
      switch (lang) {
        case "en":
          vStatusPanelTitle.innerHTML = 'You LOST!';
          break;
        default:
          vStatusPanelTitle.innerHTML = 'Przegrałeś!';
          break;
      }
      updatePanelInfo();
      updatePanelChoice();
      endGame();
      return;
    }
    who_plays = 'c';
    computerMoves();
  }
  else {
    if (currentBalls.length == 0) {
      switch (lang) {
        case "en":
          vStatusPanelTitle.innerHTML = 'You WON!';
          break;
        default:
          vStatusPanelTitle.innerHTML = 'Wygrałeś!';
          break;
      }
      updatePanelInfo();
      updatePanelChoice();
      endGame();
      return;
    }
    who_plays = 'p';
    playerMoves();
  }
}

function playerMoves() {
  updatePanelChoice(0);
  updatePanelInfo(currentBalls.length);
  switch (lang) {
    case "en":
      vStatusPanelTitle.innerHTML = "Your move...";
      break;
    default:
      vStatusPanelTitle.innerHTML = "Twój ruch...";
      break;
  }
  for (var b = 0; b < Math.min(currentBalls.length, ballsMoveNbr); b = b + 1) {
    if (b == currentBalls.length - 1) {
      currentBalls[b].addEventListener('click', ballClickHandler);
      currentBalls[b].addEventListener('mouseover', bombMouseoverHandler);
      currentBalls[b].addEventListener('mouseout', bombMouseoutHandler);
    }
    else {
      currentBalls[b].addEventListener('click', ballClickHandler);
      currentBalls[b].addEventListener('mouseover', ballMouseoverHandler);
      currentBalls[b].addEventListener('mouseout', ballMouseoutHandler);
    }
  }
}

function chooseBalls(ballsTaken) {
  for (var i = 0; i < ballsTaken ; i++) {
    if (i == currentBalls.length - 1) {
      currentBalls[i].removeEventListener('mouseout', bombMouseoutHandler);
    } else {
      currentBalls[i].removeEventListener('mouseover', ballMouseoverHandler);
      currentBalls[i].removeEventListener('mouseout', ballMouseoutHandler);
    }
    currentBalls[i].removeEventListener('click', ballClickHandler);
    gameBalls.removeChild(currentBalls[i]);
  }
  currentBalls = currentBalls.slice(ballsTaken);
  endTurn();
}

function computerMoves() {
  switch (lang) {
    case "en":
      vStatusPanelTitle.innerHTML = "Computer moves";
      break;
    default:
      vStatusPanelTitle.innerHTML = 'Ruch komputera';
      break;
  }
  updatePanelInfo(currentBalls.length);
  var   remainingBalls = currentBalls.length;
  if (remainingBalls > 1) {
    var rem = remainingBalls % (ballsMoveNbr+1);
    if (rem == 0) {
      for (var i = 0; i < ballsMoveNbr; i = i + 1) {
        currentBalls[i].src = ballCmpSrc;
      }
      updatePanelChoice(ballsMoveNbr);
      setTimeout( function() { chooseBalls(ballsMoveNbr); }, 1500);
    }
    if (rem == 1) {
      var randMove = Math.floor(Math.random() * ballsMoveNbr) + 1;
      //alert(randMove);
      for (var i = 0; i < randMove; i = i + 1) {
        currentBalls[i].src = ballCmpSrc;
      }
      updatePanelChoice(randMove);
      setTimeout( function() { chooseBalls(randMove); }, 1500);
    }
    if (rem > 1) {
      for (var i = 0; i < (rem - 1); i = i + 1) {
        currentBalls[i].src = ballCmpSrc;
      }
      updatePanelChoice(rem-1);
      setTimeout( function() { chooseBalls(rem - 1); }, 1500);
    }
  } else if (remainingBalls == 1) {
    currentBalls[0].className = 'ball96';
    //currentBalls[0].height = 96;
    updatePanelChoice(1);
    setTimeout( function() { chooseBalls(1); }, 1500);
  }
  //alert(currentBalls[0].mouseout);
}

function endGame() {
  switch (lang) {
    case "en":
      againButton = "<button type=\"button\" class=\"btn btn-primary btn-lg\" onclick=\"resetGame()\">Play again?</button>";
      break;
    default:
      againButton = "<button type=\"button\" class=\"btn btn-primary btn-lg\" onclick=\"resetGame()\">Jeszcze raz?</button>";
      break;
  }

  //gameBalls = document.getElementById('balls-col');
  gameBalls.innerHTML = againButton;
  gameBalls.className = "col-xs-12 again";
}

function resetGame() {
  switch (lang) {
    case "en":
      gameTitle = "<h1 id=\"gameTitle\">SUBTRACTION: The Game</h1>"
      break;
    default:
      gameTitle = "<h1 id=\"gameTitle\">Gra w odejmowanie</h1>"
      break;
  }

  gameBalls.innerHTML = "";
  game.appendChild(startPanel);
  // gameStatus.innerHTML = gameTitle;
  vStatusPanelTitle.innerHTML = gameTitle;
  vStatusPanelInfo.innerHTML = '';
  updatePanelChoice();
  gameBalls.className = "balls-row col-xs-12"
}

function updatePanelChoice(nbr) {
  if (nbr != undefined) {
    switch (lang) {
      case "en":
        if (nbr == 1) {
          vStatusPanelChoice.innerHTML = nbr+' ball highlighted.';
        } else {
          vStatusPanelChoice.innerHTML = nbr+' balls highlighted.';
        }
        break;
      default:
        if (nbr == 1) {
          vStatusPanelChoice.innerHTML = 'Zaznaczyłeś '+nbr+' piłeczkę.';
        } else if (nbr > 1 && nbr < 5) {
          vStatusPanelChoice.innerHTML = 'Zaznaczyłeś '+nbr+' piłeczki.';
        } else {
          vStatusPanelChoice.innerHTML = 'Zaznaczyłeś '+nbr+' piłeczek.';
        }
        break;
    }

  } else {
    vStatusPanelChoice.innerHTML = '';
  }
}

function updatePanelInfo(nbr) {
  if (nbr != undefined) {
    switch(lang) {
      case "en":
        if (nbr == 1) {
          vStatusPanelInfo.innerHTML = nbr + ' ball left';
        } else {
          vStatusPanelInfo.innerHTML = nbr + ' balls left';
        }
        break;
      default:
        if (nbr == 1) {
          vStatusPanelInfo.innerHTML = 'Została '+nbr+' piłeczka.';
        } else if (nbr > 1 && nbr < 5) {
          vStatusPanelInfo.innerHTML = 'Zostały '+nbr+' piłeczki.';
        } else {
          vStatusPanelInfo.innerHTML = 'Zostało '+nbr+' piłeczek.';
        }
        break;
    }
  } else {
    vStatusPanelInfo.innerHTML = '';
  }
}
