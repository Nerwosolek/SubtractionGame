var game;
var who_plays; // c - computer, p - player
var startPanel;
var statusPanel;
var ballsNumber = 12;
var currentBalls;
var tmpBall;
var bomb;
var ballSrc = 'img/beach-ball-4.png';
var ballInvSrc = 'img/beach-ball-4inv.png';
var ballCmpSrc = 'img/beach-ball-4cmp.png';
var bombSrc = 'img/bomb.png';
function ballMouseoutHandler() {
    //currentBalls[0].src = ballSrc;
    alert('mouse out!');
    //gameBalls.appendChild(tmpBall);
}

function ballMouseoverHandler() {
    //e.stopPropagation();
    this.src = ballInvSrc;
}

function ballClickHandler() {
  //if (currentBalls[0] == this) alert('I am 1st ball!');
  //if (currentBalls[1] == this) alert('I am 2nd ball!');
  this.removeEventListener('mouseout', ballMouseoutHandler);
  gameBalls.removeChild(this);
}

function prepareGame(gameDiv) {
  game = gameDiv;
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
  game.removeChild(startPanel);
  gameBalls = document.getElementById('balls-col');
  tmpBall = createBall();
  gameBalls.appendChild(tmpBall);
  tmpBall.addEventListener('click', ballClickHandler);
  tmpBall.addEventListener('mouseover', ballMouseoverHandler);
  tmpBall.addEventListener('mouseout', ballMouseoutHandler);
}

function createBall() {
  var ball = new Image();
  ball.src = ballSrc;
  ball.classList.add('ball');
  return ball;
}
