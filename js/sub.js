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
    if (currentBalls.length == 2) currentBalls[0].src = ballSrc;
}

function bombMouseoverHandler() {
    currentBalls[currentBalls.length - 1].className = 'ball96';
    if (currentBalls.length == 2) currentBalls[0].src = ballInvSrc;
}

function ballMouseoutHandler() {
    this.src = ballSrc;
    currentBalls[0].src = ballSrc;
//    alert('mouse out!');
}

function ballMouseoverHandler() {
    this.src = ballInvSrc;
    currentBalls[0].src = ballInvSrc;
}

function ballClickHandler() {
  //if (currentBalls[0] == this) alert('I am 1st ball!');
  //if (currentBalls[1] == this) alert('I am 2nd ball!');
  if (currentBalls[0] == this) {
    chooseBalls(1);
  }
  if (currentBalls[1] == this) {
    chooseBalls(2);
  }
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
  statusPanel = document.getElementById('gameStatus');
  startPanel = document.getElementById('startPanel');
  ballsNumber = document.getElementById('totalBallsNbr').value;
  currentBallsNumber = ballsNumber;
  ballsMoveNbr = document.getElementById('ballsMoveNbr').value;
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
          gameStatus.innerHTML = 'You LOST!';
          break;
        default:
          gameStatus.innerHTML = 'Przegrałeś!';
          break;
      }
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
          gameStatus.innerHTML = 'You WON!';
          break;
        default:
          gameStatus.innerHTML = 'Wygrałeś!';
          break;
      }
      endGame();
      return;
    }
    who_plays = 'p';
    playerMoves();
  }
}

function playerMoves() {
  switch (lang) {
    case "en":
      gameStatus.innerHTML = "Your move...";
      break;
    default:
      gameStatus.innerHTML = 'Twój ruch...';
      break;
  }
  if (currentBalls.length == 2 || currentBalls.length == 1) {
    currentBalls[currentBalls.length - 1].addEventListener('click', ballClickHandler);
    currentBalls[currentBalls.length - 1].addEventListener('mouseover', bombMouseoverHandler);
    currentBalls[currentBalls.length - 1].addEventListener('mouseout', bombMouseoutHandler);
    if (currentBalls.length == 2) {
      currentBalls[0].addEventListener('click', ballClickHandler);
      currentBalls[0].addEventListener('mouseover', ballMouseoverHandler);
      currentBalls[0].addEventListener('mouseout', ballMouseoutHandler);
    }
  }
  if (currentBalls.length > 2) {
    currentBalls[0].addEventListener('click', ballClickHandler);
    currentBalls[0].addEventListener('mouseover', ballMouseoverHandler);
    currentBalls[0].addEventListener('mouseout', ballMouseoutHandler);
    currentBalls[1].addEventListener('click', ballClickHandler);
    currentBalls[1].addEventListener('mouseover', ballMouseoverHandler);
    currentBalls[1].addEventListener('mouseout', ballMouseoutHandler);
  }
}

function chooseBalls(ballsTaken) {
  currentBalls[0].removeEventListener('click', ballClickHandler);
  currentBalls[0].removeEventListener('mouseover', ballMouseoverHandler);
  currentBalls[0].removeEventListener('mouseout', ballMouseoutHandler);
  if (currentBalls.length > 1) {
    currentBalls[1].removeEventListener('click', ballClickHandler);
    currentBalls[1].removeEventListener('mouseover', ballMouseoverHandler);
    currentBalls[1].removeEventListener('mouseout', ballMouseoutHandler);
  }
  if (currentBalls.length == 2 || currentBalls.length == 1) {
    currentBalls[currentBalls.length - 1].removeEventListener('mouseout', bombMouseoutHandler);
  }
  for (var i = 0; i < ballsTaken ; i++) {
    gameBalls.removeChild(currentBalls[i]);
  }
  currentBalls = currentBalls.slice(ballsTaken);
  endTurn();
}

function computerMoves() {
  switch (lang) {
    case "en":
      gameStatus.innerHTML = "Computer moves";
      break;
    default:
      gameStatus.innerHTML = 'Ruch komputera';
      break;
  }
  var   remainingBalls = currentBalls.length;
  if (remainingBalls > 1) {
    var rem = remainingBalls % 3;
    if (rem == 0) {
      currentBalls[0].src = ballCmpSrc;
      currentBalls[1].src = ballCmpSrc;
      setTimeout( function() { chooseBalls(2); }, 1500);
    }
    if (rem == 1) {
      var randMove = Math.floor(Math.random() * 2) + 1;
      //alert(randMove);
      currentBalls[0].src = ballCmpSrc;
      if (randMove > 1) currentBalls[1].src = ballCmpSrc;
      setTimeout( function() { chooseBalls(randMove); }, 1500);
    }
    if (rem == 2) {
      currentBalls[0].src = ballCmpSrc;
      setTimeout( function() { chooseBalls(1); }, 1500);
    }
  } else if (remainingBalls == 1) {
    currentBalls[0].className = 'ball96';
    //currentBalls[0].height = 96;
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
  gameStatus.innerHTML = gameTitle;
  gameBalls.className = "balls-row col-xs-12"
}
