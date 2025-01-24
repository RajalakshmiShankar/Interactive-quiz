const quizData = [
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Jupiter", "Saturn", "Earth", "Mars"],
    correct: 0, // Index of correct answer (Jupiter)
  },
  {
    question: 'Who wrote the play "Romeo and Juliet"?',
    choices: [
      "William Shakespeare",
      "Charles Dickens",
      "Mark Twain",
      "Jane Austen",
    ],
    correct: 0, // Index of correct answer (William Shakespeare)
  },
  {
    question: "What is the chemical symbol for water?",
    choices: ["H2O", "CO2", "NaCl", "O2"],
    correct: 0, // Index of correct answer (H2O)
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    choices: ["Japan", "China", "South Korea", "Thailand"],
    correct: 0, // Index of correct answer (Japan)
  },
  {
    question: "What is the capital city of Australia?",
    choices: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correct: 2, // Index of correct answer (Canberra)
  },
];

let currentQuestion = 0;
let score = 0;
let selectedChoice = null;

// Initialize the quiz
function initializeQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

// Display the current question
function showQuestion() {
  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const currentQuiz = quizData[currentQuestion];

  questionEl.textContent = currentQuiz.question;
  choicesEl.innerHTML = "";

  currentQuiz.choices.forEach((choice, index) => {
    const choiceDiv = document.createElement("div");
    choiceDiv.className = "choice";
    choiceDiv.textContent = choice;
    choiceDiv.addEventListener("click", () => selectChoice(index));
    choicesEl.appendChild(choiceDiv);
  });

  document.getElementById("submit").style.display = "block";
  document.getElementById("next").style.display = "none";
  selectedChoice = null;
}

// Handle choice selection
function selectChoice(index) {
  const choices = document.querySelectorAll(".choice");
  choices.forEach((choice) => choice.classList.remove("selected"));
  choices[index].classList.add("selected");
  selectedChoice = index;
}

// Check the answer
function checkAnswer() {
  if (selectedChoice === null) {
    alert("Please select an answer!");
    return;
  }

  const choices = document.querySelectorAll(".choice");
  const correct = quizData[currentQuestion].correct;

  choices.forEach((choice, index) => {
    if (index === correct) {
      choice.classList.add("correct");
    } else if (index === selectedChoice) {
      choice.classList.add("incorrect");
    }
    choice.style.pointerEvents = "none";
  });

  if (selectedChoice === correct) {
    score++;
  }

  document.getElementById("submit").style.display = "none";
  document.getElementById("next").style.display = "block";
}

// Move to next question or show results
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// Show final results
function showResults() {
  const quizEl = document.getElementById("quiz");
  const resultsEl = document.getElementById("results");
  const scoreEl = document.getElementById("score");

  quizEl.style.display = "none";
  resultsEl.style.display = "block";
  scoreEl.textContent = `${score} out of ${quizData.length}`;

  updateHighScores();
}

// Update and display high scores
function updateHighScores() {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const currentScore = {
    score: score,
    date: new Date().toLocaleDateString(),
  };

  highScores.push(currentScore);
  highScores.sort((a, b) => b.score - a.score);
  highScores = highScores.slice(0, 5); // Keep only top 5 scores

  localStorage.setItem("highScores", JSON.stringify(highScores));

  const highScoresList = document.getElementById("highScores");
  highScoresList.innerHTML = highScores
    .map(
      (score) => `<li>${score.score}/${quizData.length} - ${score.date}</li>`
    )
    .join("");
}

// Restart the quiz
function restartQuiz() {
  const quizEl = document.getElementById("quiz");
  const resultsEl = document.getElementById("results");

  quizEl.style.display = "block";
  resultsEl.style.display = "none";
  initializeQuiz();
}

// Event listeners
document.getElementById("submit").addEventListener("click", checkAnswer);
document.getElementById("next").addEventListener("click", nextQuestion);
document.getElementById("restart").addEventListener("click", restartQuiz);

// Start the quiz when the page loads
initializeQuiz();

// Add at the beginning of your script.js
document.addEventListener("DOMContentLoaded", function () {
  const frontPage = document.getElementById("front-page");
  const quizContent = document.getElementById("quiz-content");
  const startButton = document.getElementById("start-quiz");

  startButton.addEventListener("click", function () {
    frontPage.style.display = "none";
    quizContent.style.display = "block";
    // If you have a function to initialize the quiz, call it here
    // initializeQuiz();
  });
});
