const questions = [
    {
        question: "The word vast in paragraph 1 is closest in meaning to _____.",
        answers: [
            {text: "very large", correct: false},
            {text: "pretty", correct: true},
            {text: "small", correct: false},
            {text: "faraway", correct: false},
        ]
    },
    {
        question: "The closest in meaning to the word landscape in paragraph 1 is _____.",
        answers: [
            {text: "an area of land for living", correct: false},
            {text: "a painting", correct: false},
            {text: "an icy environment", correct: true},
            {text: "the way an area of land looks", correct: false},
        ]
    },
    {
        question: "The closest in meaning to the word preserved in paragraph 2 is _____.",
        answers: [
            {text: "closed", correct: false},
            {text: "explored", correct: true},
            {text: "protected", correct: false},
            {text: "changed", correct: false},
        ]
    },
    {
        question: "The closest in meaning to the word inhabit in paragraph 2 is_____.",
        answers: [
            {text: "avoid", correct: false},
            {text: "cover", correct: true},
            {text: "prefer", correct: false},
            {text: "livein", correct: false},
        ]
    },
    {
        question: "The word harsh in paragraph 2 is closest in meaning to _____.",
        answers: [
            {text: "unpleasantly difficult", correct: false},
            {text: "mild", correct: true},
            {text: "dry", correct: false},
            {text: "cold", correct: false},
        ]
    },
    {
        question: "The word remote in paragraph 2 is closest in meaning to _____.",
        answers: [
            {text: "ideal", correct: false},
            {text: "isolated", correct: true},
            {text: "hostile", correct: false},
            {text: "lonely", correct: false},
        ]
    },
    {
        question: "The word disturb in paragraph 3 is closest in meaning to _____.",
        answers: [
            {text: "make somebody/something happy", correct: false},
            {text: "bring somebody/something comfort", correct: true},
            {text: "annoy somebody/something", correct: false},
            {text: "cause somebody/something to die", correct: false},
        ]
    },
    {
        question: "The word temporary in paragraph 4 is closest in meaning to _____.",
        answers: [
            {text: "rich and adventurous", correct: false},
            {text: "careful", correct: true},
            {text: "lasting for a limited time", correct: false},
            {text: "responsible", correct: false},
        ]
    },
    {
        question: "The word consequences in paragraph 5 is closest in meaning to _____.",
        answers: [
            {text: "acquaintances", correct: false},
            {text: "effects", correct: true},
            {text: "causes", correct: false},
            {text: "disasters", correct: false},
        ]
    },
    {
        question: "The word fragile in paragraph 5 is closest in meaning to _____.",
        answers: [
            {text: "native", correct: false},
            {text: "rare", correct: true},
            {text: "useful", correct: false},
            {text: "easily damaged", correct: false},
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
