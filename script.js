const questions = [
    {
        question: "She _______ to the store yesterday.",
        answers: [
            {text: "had went", correct: false},
            {text: "had gone", correct: false},
            {text: "went", correct: true},
            {text: "go", correct: false},
        ]
    },
    {
        question: "He usually _______ to the gym after work.",
        answers: [
            {text: "had went", correct: false},
            {text: "had gone", correct: false},
            {text: "went", correct: false},
            {text: "go", correct: true},
        ]
    },
    {
        question: "Which sentence contains the correct past tense verb form?",
        answers: [
            {text: "He flied to London last week.", correct: false},
            {text: "He flew to London last week.", correct: true},
            {text: "He flyed to London last week.", correct: false},
            {text: "He flown to London last week.", correct: false},
        ]
    },
    {
        question: "The children ____ playing in the park.",
        answers: [
            {text: "is", correct: false},
            {text: "are", correct: true},
            {text: "am", correct: false},
            {text: "be", correct: false},
        ]
    },
    {
        question: "Choose the sentence with the correct verb tense:",
        answers: [
            {text: "I am studying for my exam tomorrow.", correct: true},
            {text: "I studying for my exam tomorrow.", correct: false},
            {text: "I was studying for my exam tomorrow.", correct: false},
            {text: "I will studying for my exam tomorrow.", correct: false},
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
    } )
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

startQuiz ();
