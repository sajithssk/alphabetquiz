
const container = $('#container')
const containerWin = $('#container-right-win')
const containerCancelGame = $('#container-right-cancelGame')
const containerGame = $('#container-right-game')
const containerRules = $('#container-right-rules')
const containerRanking = $('#container-right-ranking')

const generalDiv = $('div')
const generalInput = $('input')
const generalButton = $('button')

const inputName = $('#name')
const question = $('#question')
const inputAnswer = $('#answer')
const nameShownInDOM = $('h1:nth-child(2)')
const circle = $('.circle')

const radioAvatarMan = $('#radio-avatar-man')
const radioAvatarWoman = $('#radio-avatar-woman')
const imageAvatarMan = $('#image-avatar-man')
const imageAvatarWoman = $('#image-avatar-woman')

const playGameButton = $('#play-game-button')
const submitButton = $('#submit-button')
const nextButton = $('#next-button')
const rankingButton = $('#ranking-button')
const endButton = $('#end-button')
const playAgainButton = $('.play-again-button')

const suceessSound = $('.audio')[0]
const failSound = $('.audio')[1]
const cancelGameSound = $('.audio')[2]
const finishGameSound = $('.audio')[3]
$('.low').prop("volume", 0.5); //set volume to audios

const score = $('#score')
const timer = $('#timer')

const guessedWords = $('.guessed-words')
const failedWords = $('.failed-words')
const finalScore = $('.final-score')

const rankingName = $('.ranking-name')
const rankingPoints = $('.ranking-points')


inputName.focus()


function setUserName() {
  name = inputName.val();
  if(name === "") {
    name = "Anonymous";
  }
  name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  nameShownInDOM.text(name);
}


function setAvatar() {
  radioAvatarMan.prop( "checked" ) ? imageAvatarMan.show()
                              : imageAvatarWoman.show();
}

function answerIsCorrectDom(i) {
  suceessSound.play(); 
  $('#' + randomQuestions[i].letter).addClass('green');
}


function answerIsWrongDom(i) {
  failSound.play(); 
  $('#' + randomQuestions[i].letter).addClass('red'); 
}

function showPointsDom(points) {
  score.text(points);
}

function showTimerInDom(seconds) {
  timer.text(seconds);
}


function toggleLetter(i) {
  if(i < 26) { 
    $('#' + randomQuestions[i].letter).fadeToggle('slow', function() {
      toggleLetter(i);
    })
  }
}


function distoggleLetter(i) {
  if(i < 26) { 
    $('#' + randomQuestions[i].letter).stop().css('opacity', '1');
  }
}


function showQuestion(i) {
  toggleLetter(i);
  question.text(randomQuestions[i].question);
}

function continuePlayingDom(i) {
  inputAnswer.val('');
  showQuestion(i);
}


function startGameDom() {
  containerRules.hide();
  containerGame.attr('style', 'display : flex');
  inputAnswer.focus();
}

function endGameDom() {
  containerGame.hide();
  containerWin.attr('style', 'display : flex');
  finalScore.text(points);
  failedWords.text(26-points);
  guessedWords.text(points);
  generalButton.focus();
  distoggleLetter(i);
  finishGameSound.play()
}

function resetDom() {
  generalDiv.removeClass("red");
  generalDiv.removeClass("green");
  generalInput.val('');
  inputName.text('');
  score.text(points);
  timer.text(seconds);
  nameShownInDOM.text(name);
  imageAvatarMan.hide();
  imageAvatarWoman.hide();
}

function playAgainDom() {
  containerWin.hide();
  containerGame.hide();
  containerCancelGame.hide();
  containerRanking.hide();
  containerRules.show();
  container.show();
  inputName.focus();
}

function cancelGameDom() {
  cancelGameSound.play()
  gameIsCancelled = true;
  containerGame.hide();
  containerCancelGame.attr('style', 'display : flex');
  finalScore.text(points);
  failedWords.text(26-points);
  guessedWords.text(points);
  distoggleLetter(i);
  generalInput.focus();
}

function showRankingDom() {
  containerWin.hide();
  containerRanking.attr('style', 'display : flex');
  for(let i in ranking) {
    rankingName[i].textContent = ranking[i].name;
    rankingPoints[i].textContent = ranking[i].points;
  };
  generalButton.focus();
}


function getInputAnswerDom() {
  return inputAnswer.val()
}


function playGameDomEvent(cb) {
  playGameButton.click(cb)
  inputName.keypress(function(e) {
    if(e.which == 13) {
      cb();
    }
  })
}

function validateInputDomEvent(cb) {
  inputAnswer.keypress(function(e) {
    if(e.which == 13) {
      cb();
    }
  })
  submitButton.click(function(e) {
    cb();
  })
}

function nextButtonDomEvent(cb) {
  nextButton.click(cb)
}

function playAgainDomEvent(cb) {
  playAgainButton.click(cb)
}

function endDomEvent(cb) {
  endButton.click(cb)
}

function rankingDomEvent(cb) {
  rankingButton.click(cb)
}