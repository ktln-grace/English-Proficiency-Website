const questions = [
    {
        question: "My mother likes walking on the beach.",
        answers: [
            {text: "Declarative sentence", correct: true},
            {text: "Imperative sentence", correct: false},
            {text: "Interrogative sentence", correct: false},
            {text: "Exclamatory sentence", correct: false},
        ]
    },
    {
        question: "Hand over the remote.",
        answers: [
            {text: "Declarative sentence", correct: false},
            {text: "Imperative sentence", correct: false},
            {text: "Interrogative sentence", correct: true},
            {text: "Exclamatory sentence", correct: false},
        ]
    },
    {
        question: "Why haven't you been studying?",
        answers: [
            {text: "Declarative sentence", correct: false},
            {text: "Imperative sentence", correct: true},
            {text: "Interrogative sentence", correct: false},
            {text: "Exclamatory sentence", correct: false},
        ]
    },
    {
        question: "What! Did he really do that?",
        answers: [
            {text: "Declarative sentence", correct: false},
            {text: "Imperative sentence", correct: false},
            {text: "Interrogative sentence", correct: false},
            {text: "Exclamatory sentence", correct: true},
        ]
    },
    {
        question: "When will you visit your grandfather?",
        answers: [
            {text: "Declarative sentence", correct: false},
            {text: "Imperative sentence", correct: true},
            {text: "Interrogative sentence", correct: false},
            {text: "Exclamatory sentence", correct: false},
        ]
    },
    {
        question: " Marian put her glasses on, too.",
        answers: [
            {text: "Complex Sentence", correct: false},
            {text: "Compound Sentence", correct: false},
            {text: "Compound-Complex Sentence", correct: false},
            {text: "Simple Sentence", correct: true},
        ]
    },
    {
        question: "On Saturday, I threw snowballs at three silly boys.",
        answers: [
            {text: "Complex Sentence", correct: false},
            {text: "Simple Sentence", correct: true},
            {text: "Compound Sentence", correct: false},
            {text: "Compound-Complex Sentence", correct: false},
        ]
    },
    {
        question: "Faith and Janelle whispered and giggled all night.",
        answers: [
            {text: "Simple Sentence", correct: true},
            {text: "Compound Sentence", correct: false},
            {text: "Complex Sentence", correct: false},
            {text: "Compound-Complex Sentence", correct: false},
        ]
    },
    {
        question: "I like work, but I hate getting up so early.",
        answers: [
            {text: "Simple Sentence", correct: false},
            {text: "Complex Sentence", correct: false},
            {text: "Compound Sentence", correct: true},
            {text: "Complex- Compound Sentence", correct: false},
        ]
    },
    {
        question: "Ice Cream is my favorite food.",
        answers: [
            {text: "Compound Complex", correct: false},
            {text: "Complex Sentence", correct: false},
            {text: "Compound Sentence", correct: false},
            {text: "Simple Sentence", correct: true},
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
    nextButton.innerHTML = 'Try Again';
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

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
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
