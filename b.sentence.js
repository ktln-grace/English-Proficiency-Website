const questions = [
    {
        question: "____ Turkish Airlines is one of ____ safest airlines in ____ world.",
        answers: [
            {text: "___ /the /the", correct: true},
            {text: "/the /the /-", correct: false},
            {text: "___/ ___/ the", correct: false},
            {text: "/the / - /the ", correct: false},
        ]
    },
    {
        question: "My parents never let me _____ out at nights.",
        answers: [
            {text: "go", correct: true},
            {text: "gone", correct: false},
            {text: "to go", correct: false},
            {text: "going", correct: false},
        ]
    },
    {
        question: "The young woman stopped to imagine the distance between her and her family, now that she was in France and thought: 6000 miles ___ a long distance, yet sometimes not far enough.",
        answers: [
            {text: "are", correct: false},
            {text: "does", correct: false},
            {text: "were", correct: false},
            {text: "is", correct: true},
        ]
    },
    {
        question: "Pete ___ by the time the meeting starts.",
        answers: [
            {text: "arrived", correct: false},
            {text: "will have arrived", correct: true},
            {text: "had arrived", correct: false},
            {text: "has arrived", correct: false},
        ]
    },
    {
        question: "While he _____ his speech, the minister suddenly _____ a sharp pain in his left arm.",
        answers: [
            {text: "made/ felt", correct: false},
            {text: "was making/ feel", correct: false},
            {text: "made/ was feeling", correct: false},
            {text: "was making/ felt", correct: true},
        ]
    },
    {
        question: "Never before __________ such ridiculous arguments.",
        answers: [
            {text: "we had heard", correct: false},
            {text: "have we heard", correct: true},
            {text: "we have heard", correct: false},
            {text: "we could have heard", correct: false},
        ]
    },
    {
        question: "_________ you have driven a car like this, you will never want to drive any other car.",
        answers: [
            {text: "Although", correct: false},
            {text: "Once", correct: true},
            {text: "In case", correct: false},
            {text: "Therefore", correct: false},
        ]
    },
    {
        question: "The roads seem to be ____ icy so drive carefully.",
        answers: [
            {text: "have getting", correct: false},
            {text: "got", correct: false},
            {text: "getting", correct: true},
            {text: "to get", correct: false},
        ]
    },
    {
        question: "The council is in discussion with Donald Trump, _____ land most of the village is built.",
        answers: [
            {text: "of which", correct: false},
            {text: "that", correct: false},
            {text: "who", correct: false},
            {text: "on whose", correct: true},
        ]
    },
    {
        question: "The boss wanted to know _______________",
        answers: [
            {text: "why we were late", correct: true},
            {text: "why were you late", correct: false},
            {text: "why have you been late", correct: false},
            {text: "why are we late", correct: false},
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
