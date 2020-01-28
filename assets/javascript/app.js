const myQuestions = [
  {
    question: "Who is the strongest?",
    answers: {
      a: "Superman",
      b: "The Terminator",
      c: "Waluigi, obviously"
    },
    correctAnswer: "c"
  },
  {
    question: "What is the best site ever created?",
    answers: {
      a: "SitePoint",
      b: "Simple Steps Code",
      c: "Trick question; they're both the best"
    },
    correctAnswer: "c"
  },
  {
    question: "Where is Waldo really?",
    answers: {
      a: "Antarctica",
      b: "Exploring the Pacific Ocean",
      c: "Sitting in a tree",
      d: "Minding his own business, so stop asking"
    },
    correctAnswer: "d"
  }
];

let answerNumber = 0;

myQuestions.forEach(currentQuestion => {
  let output = []; // an array to hold the html
  let answers = [];
  answerNumber++;

  for (const letter in currentQuestion.answers) {
    let answersHtml = '';
    answersHtml += `<label><input type="radio" class="answerRadioBtn${answerNumber}" name="answerRadioBtn${answerNumber}" value="${answerNumber}${letter}">${letter}: ${currentQuestion.answers[letter]}</label>`;
    answers.push(answersHtml);
  }

  output.push(
    `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers" data-correctnaswer= "${answerNumber}${currentQuestion.correctAnswer}"> ${answers.join('')} </div>`
  );

  $('#questions').append(output.join(""));
});


$('#questions').append("<button id='doneBtn'>Done</button>")

let answerSelected1 = '';
let answerSelected2 = '';
let answerSelected3 = '';

let dataCorrectAnswer1 = $("#doneBtn").closest('div#questions').find('.answers').eq(0).data('correctnaswer');
let dataCorrectAnswer2 = $("#doneBtn").closest('div#questions').find('.answers').eq(1).data('correctnaswer');
let dataCorrectAnswer3 = $("#doneBtn").closest('div#questions').find('.answers').eq(2).data('correctnaswer');

let correctAnswerCount = 0;
let incorrectAnswerCount = 0;
let unAnsweredCount = 0;

let number = 20;
let showCountDown;

const htmlUpdatedDisplay = function () {
  clearInterval(showCountDown);
  $("#questions, #startBtn").fadeOut(5, function () {
    $("#allDone").fadeIn();
    if(number===0){
      $('#timeDisplay').html("Times Up!");
    }else{
      $('#timeDisplay').html("");
    }
    $('#correctAnswers').text(correctAnswerCount);
    $('#incorrectAnswers').text(incorrectAnswerCount);
    $('#unanswered').text(unAnsweredCount);
  });
}

const countdown = function () {
  number--;
  $('#timeDisplay').text("Time Remaining " + number + " Seconds!");
  if (number === 0) {
    $('#doneBtn').click();
  }
}


$('#doneBtn').on('click', function () {

  answerSelected1 = $('.answerRadioBtn1:checked').val();
  answerSelected2 = $('.answerRadioBtn2:checked').val();
  answerSelected3 = $('.answerRadioBtn3:checked').val();

  if (typeof answerSelected1 === 'undefined') {
    unAnsweredCount++;
  } else if (answerSelected1 === dataCorrectAnswer1) {
    correctAnswerCount++;
  } else {
    incorrectAnswerCount++;
  }

  if (typeof answerSelected2 === 'undefined') {
    unAnsweredCount++;
  } else if (answerSelected2 === dataCorrectAnswer2) {
    correctAnswerCount++;
  } else {
    incorrectAnswerCount++;
  }

  if (typeof answerSelected3 === 'undefined') {
    unAnsweredCount++;
  } else if (answerSelected3 === dataCorrectAnswer3) {
    correctAnswerCount++;
  } else {
    incorrectAnswerCount++;
  }

  htmlUpdatedDisplay();
});


$('#startBtn').on('click', function () {
  $("#questions, #timeDisplay").fadeIn();
  $("#startBtn").fadeOut();
  showCountDown = setInterval(countdown, 1000)
  // const mainTimer = setTimeout(timerFunc, 10000);
});