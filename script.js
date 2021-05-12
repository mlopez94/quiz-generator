
var questions = [
  {
    question: "Who is the all-time leader in points in NBA history?",
    choices: ["LeBron James", "Kareem Abdul-Jabbar", "Larry Bird", "Michael Jordan"],
    answer: "Kareem Abdul-Jabbar",
  },
  {
    question:
      "Who has the most NBA championships?",
    choices: ["Bill Russell", "Lebron James", "Kareem Abdul-Jabbar", "Magic Johnson"],
    answer: "Bill Russell",
  },
  {
    question:
    "Who led the NBA in steals during the 2019 regular season?",
    choices: ["Steph Curry", "Ben Simmons", "Patrick Beverly", "James Harden"],
    answer: "James Harden",
  },
  {
    question:
    "Who has the most Defensive Player of the Year awards?",
    choices: ["Gary Payton", "Dwight Howard", "Dikembe Mutombo", "Ben Wallace"],
    answer: "Dikembe Mutombo",
  },

];




var contentEl = document.querySelector("#button-div");
var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

var questionIndex = 0;
var correctCount = 0;

var time = 30;
var intervalId;

function endQuiz() {
  clearInterval(intervalId);
  // var body = document.body;
  // body.innerHTML = "Game over, You scored " + correctCount;
  contentEl.textContent = "";
  enterName = document.createElement('p');
  enterName.textContent = "Please enter your name";
  enterName.classList.add("enter-name");
  contentEl.appendChild(enterName);
  
  
  inputField = document.createElement('input');
  inputField.classList.add("input");
  inputField.setAttribute("type", "text");
  contentEl.appendChild(inputField);

  submitButton = document.createElement('button');
  submitButton.textContent = "Submit Name";
  submitButton.setAttribute("id", "end-button");
  contentEl.append(submitButton);

  submitButton.addEventListener("click", storeName);

  // Setting high score to localstorage
  localStorage.setItem("highscore", correctCount);

}

function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
  
  if (time == 0) {
    updateTime();
    return;
  }
  disappear();
  document.getElementById('set-timer').textContent = "Time Left:";
  intervalId = setInterval(updateTime, 1000);
  
  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 5;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}
function startQuiz() {
  //h2
  h2 = document.createElement('h2');
  h2.textContent = "Welcome to the Quiz Generator";
  h2.classList.add("title-content");
  contentEl.appendChild(h2);
//button
  button = document.createElement('button');
  button.textContent = "Start Game";
  button.setAttribute("id", "start-button");
  contentEl.append(button);

  button.addEventListener("click", renderQuestion);

}

function storeName () {
  localStorage.setItem("topScorer", JSON.stringify(inputField.value));
  return;
}

function disappear() {
  h2.remove();
  button.remove();
}



startQuiz();
optionListEl.addEventListener("click", checkAnswer);
