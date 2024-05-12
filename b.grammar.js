const questions = [
    {
        question: "The first letter of the first word in a sentence should be",
        answers: [
            {text: "a large letter", correct: true},
            {text: "a capital letter", correct: false},
            {text: "All of the above", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "The order of a basic positive sentence is",
        answers: [
            {text: "Subject-Verb-Object", correct: true},
            {text: "Verb-Object-Subject", correct: false},
            {text: "All of the above", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "Every sentence must have a subject and",
        answers: [
            {text: "a verb", correct: true},
            {text: "an object", correct: false},
            {text: "All of the above", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "A plural subject needs",
        answers: [
            {text: "a singular verb", correct: true},
            {text: "a plural verb", correct: false},
            {text: "am", correct: false},
            {text: "be", correct: false},
        ]
    },
    {
        question: "When two singular subjects are connected by ‘or’, use",
        answers: [
            {text: "a singular verb", correct: true},
            {text: "a plural verb", correct: false},
            {text: "All of the above", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "Adjectives usually come",
        answers: [
            {text: "before a noun", correct: true},
            {text: "after a noun", correct: false},
            {text: "All of the above", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "If an opinion-adjective and a fact-adjective are used before a noun, which comes first?",
        answers: [
            {text: "A fact-adjective", correct: false},
            {text: "an opinion-adjective", correct: true},
            {text: "All of the above", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "In British English, a collective noun is usually treated as",
        answers: [
            {text: "singular", correct: false},
            {text: "plural", correct: true},
            {text: "All of the above", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "The terms 'its' and 'it's' have",
        answers: [
            {text: "the same meaning", correct: false},
            {text: "different meanings", correct: true},
            {text: "All of the above", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which is correct?",
        answers: [
            {text: "You're looking good", correct: true},
            {text: "Your looking good", correct: false},
            {text: "All of the above", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    } )
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } 
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Exit Quiz';
    nextButton.style.display = "block";
    
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function exitQuiz(){
    window.location.href = '2.quizzes.html';
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        exitQuiz();
    }
});

 // Function to shuffle the questions array
function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle the questions array
shuffle(questions);

// Function to render questions
function renderQuestions() {
var quizContainer = document.getElementById('answer-buttons');

questions.forEach(function (questionObj, index) {
var questionElement = document.createElement('div');
questionElement.innerHTML = "<strong>Question " + (index + 1) + ":</strong> " + questionObj.question;
quizContainer.appendChild(questionElement);
});
}

// Call the function to render questions
renderQuestions();

startQuiz ();
