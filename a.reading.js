const questions = [
    {
        question: "Athens had _______ the other Greek city-states against the Persians.",
        answers: [
            {text: "refused help to", correct: false},
            {text: "intervened on behalf of", correct: true},
            {text: "wanted to fight", correct: false},
            {text: "given orders for all to fight", correct: false},
            {text: "defeated", correct: false},
        ]
    },
    {
        question: "Darius took drastic steps to ______ the rebellious Athenians.",
        answers: [
            {text: "weaken", correct: false},
            {text: "destroy", correct: false},
            {text: "calm", correct: true},
            {text: "irritate", correct: false},
            {text: "none of the above", correct: false},
        ]
    },
    {
        question: "Their participation _______ to the Athenians.",
        answers: [
            {text: "gave comfort", correct: false},
            {text: "gave honor", correct: true},
            {text: "gave strength", correct: false},
            {text: "gave fear", correct: false},
            {text: "gave hope", correct: false},
        ]
    },
    {
        question: "The people of Delos did not want to ____ the conquest of Greece.",
        answers: [
            {text: "end", correct: false},
            {text: "encourage", correct: true},
            {text: "think about", correct: false},
            {text: "daydream about", correct: false},
            {text: "none of the above", correct: false},
        ]
    },
    {
        question: "The Athenians were _______ by some soldiers who arrived from Plataea.",
        answers: [
            {text: "welcomed", correct: false},
            {text: "strengthened", correct: true},
            {text: "held", correct: false},
            {text: "captured", correct: false},
            {text: "none of the above", correct: false},
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
