// Global variables
const questionDiv = document.querySelector('#question');
const questionBtn = document.querySelector('#questionBtn');
const answerDiv = document.querySelector('#answer');
const feedbackDiv = document.querySelector('#feedback');
let currentQuestion = null;

// Function to get trivia question
function getTriviaQuestion() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Code to fetch random trivia will go here
      const index = Math.floor(Math.random() * questions.length);
      const question = questions[index];

      if (index > questions.length) {
        reject('An error occurred while fetching the trivia question.');
      } else {
        resolve(question);
      }
    }, 1000); // Delay of 1 second
  });
}

// Function to display question
function displayQuestion(triviaQuestion) {
  questionDiv.textContent = triviaQuestion.question;
  answerDiv.value = '';
  feedbackDiv.textContent = '';
}

// Event listener for questionDiv
questionBtn.addEventListener('click', () => {
  getTriviaQuestion()
    .then((question) => {
      currentQuestion = question;
      displayQuestion(question);

       // Update the text content of the questionDiv
       questionDiv.textContent = currentQuestion.question;
    })
    .catch((error) => {
      console.error(error);
    });
});

// Fixed selector for submitAnswer button
const submitAnswer = document.querySelector('#answerBtn');

// Event listener for submitAnswer
submitAnswer.addEventListener('click', () => {
  const userAnswer = answerDiv.value.trim().toLowerCase();
  const answer = currentQuestion.answer.toLowerCase();

  if (currentQuestion && userAnswer === answer) {
    feedbackDiv.style.color = 'green';
    feedbackDiv.textContent = 'Correct!';
  } else {
    feedbackDiv.style.color = 'red';
    feedbackDiv.textContent = `Incorrect! The correct answer is: "${answer}". Try another question!`;
  }
});

let score = 0; // Initialize score
const scoreDiv = document.querySelector('#score'); // Select the score div

// Existing event listener for answerBtn
document.getElementById('answerBtn').addEventListener('click', () => {
  const userAnswer = answerDiv.value.trim().toLowerCase();
  const answer = currentQuestion.answer.toLowerCase();

  if (currentQuestion && userAnswer === answer) {
    feedbackDiv.style.color = 'green';
    feedbackDiv.textContent = 'Correct!';
    
    score++; // Increment score
  } else {
    feedbackDiv.style.color = 'red';
    feedbackDiv.textContent = `Incorrect! The correct answer is: "${answer}". Try another question!`;
  }
  
  // Update the score display
  scoreDiv.textContent = `Score: ${score}`;
});

