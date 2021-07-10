let ranking = [];
let name = '';
let points = 0;
let totalWords = 26;
let i = 0;
let seconds = 180;
let gameIsCancelled = false;


function startGame() {
  startGameDom()
  setUserName();
  setAvatar();
  setTimer();
  setRandomArray();
  showQuestion(i);
}


function validateInput() {
  if(i < 26) {
    randomQuestions[i].userAnswer = getInputAnswerDom();
    distoggleLetter(i);
    checkAnswer(i);
    i++;
    continuePlaying(i);
  }
}


function checkAnswer(i) {
  if(randomQuestions[i].userAnswer.toUpperCase() === 
  randomQuestions[i].answer.toUpperCase()) {
    randomQuestions[i].status = true;
    totalWords--; 
    answerIsCorrectDom(i)
    setPoints(); 
  } else { 
    randomQuestions[i].status = false; 
    totalWords--; 
    answerIsWrongDom(i)
  }
}


function setPoints() {
  points += 1;
  showPointsDom(points)
}


function moveToNextQuestion(i) {
  let cutNextQuestion = randomQuestions.splice(i, 1)[0];
  randomQuestions.push(cutNextQuestion);
}

function continuePlaying(i) {
  if(totalWords !== 0) {
    continuePlayingDom(i)
  } else {
    
  }
}


function nextButtonBehavior() {
  distoggleLetter(i);
  moveToNextQuestion(i);
  continuePlaying(i);
}


function setTimer() {
  var callbackFunction = function () {
    timeoutId = setTimeout(callbackFunction, 1000);
    seconds -= 1;
    showTimerInDom(seconds)
    if(gameIsCancelled) {
      seconds = 0;
      clearTimeout(timeoutId);
      cancelGameDom();
    } else if (seconds <= 0 || totalWords === 0) {
      clearTimeout(timeoutId);
      endGameDom();
      setRanking();
    }
  }
  var timeoutId = setTimeout(callbackFunction);
}


function initializeVariables() {
  randomQuestions = [];
  name = "";
  points = 0;
  totalWords = 26;
  i = 0;
  seconds = 180;
  gameIsCancelled = false;
  resetDom()
}


function playAgain() {
  initializeVariables();
  playAgainDom()
}


function setRanking(){
  ranking.push({'name': name, 'points': points});
  ranking.sort((a, b) => b.points - a.points);
  if(ranking.length > 10) {
    ranking.pop()
  }
}

playGameDomEvent(startGame) 

validateInputDomEvent(validateInput) 

nextButtonDomEvent(nextButtonBehavior) 

playAgainDomEvent(playAgain) 

endDomEvent(cancelGameDom) 

rankingDomEvent(showRankingDom) 

