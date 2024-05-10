const questions = [
    {
        question: "She _______ to the store yesterday.",
        answers: [
            {text: "had went", correct: true},
            {text: "had gone", correct: false},
            {text: "went", correct: false},
            {text: "go", correct: false},
        ]
    },
    {
        question: "He usually _______ to the gym after work.",
        answers: [
            {text: "go", correct: false},
            {text: "goes", correct: true},
            {text: "going", correct: false},
            {text: "gone", correct: false},
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
    {
        question: "Choose the correct sentence:",
        answers: [
            {text: "The desk and the chair sits in the corner.", correct: true},
            {text: "The desk and the chair sit in the corner.", correct: false},
            {text: "Both A and B are correct.", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "Choose the correct sentence:",
        answers: [
            {text: "Each of us was scheduled to take the test.", correct: false},
            {text: "Each of us were scheduled to take the test.", correct: true},
            {text: "Both A and B are correct.", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "Choose the correct sentence:",
        answers: [
            {text: "The coach, not the players, has been ill.", correct: true},
            {text: "The coach, not the players, have been ill.", correct: false},
            {text: "Both A and B are correct.", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "Choose the correct sentence:",
        answers: [
            {text: "There are only four days until Christmas.", correct: true},
            {text: "There’s only four days until Christmas.", correct: false},
            {text: "Both A and B are correct.", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "Choose the correct sentence:",
        answers: [
            {text: "She is one of those women who works hard.", correct: false},
            {text: "She is one of those women who work hard.", correct: true},
            {text: "Both A and B are correct.", correct: false},
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

startQuiz ();
