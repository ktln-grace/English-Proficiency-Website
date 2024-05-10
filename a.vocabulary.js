const questions = [
    {
        question: "We will only sell our house as a last “ resort “ to pay our debts.",
        answers: [
            {text: "Recourse", correct: true},
            {text: "Retreat", correct: false},
            {text: "Conduct", correct: false},
            {text: "Haunt", correct: false},
        ]
    },
    {
        question: "The editor didn’t want to be “ distracted” while working on the minute details of the movie.",
        answers: [
            {text: "Deceased", correct: false},
            {text: "Discerning", correct: false},
            {text: "Dissenting", correct: false},
            {text: "Disturbed", correct: true},
        ]
    },
    {
        question: "Rodel was “ appointed “ as treasurer of the class.",
        answers: [
            {text: "Alotted", correct: false},
            {text: "Confessed", correct: false},
            {text: "Assignend", correct: true},
            {text: "Enacted", correct: false},
        ]
    },
    {
        question: "There were many “ complications “ after the surgery but he survived.",
        answers: [
            {text: "Difficulty", correct: true},
            {text: "Sequences", correct: false},
            {text: "Complements", correct: false},
            {text: "Complicities", correct: false},
        ]
    },
    {
        question: "The makeup reflects light and give the skin a “ luminous “ glow.",
        answers: [
            {text: "Bright", correct: true},
            {text: "Ecstatic", correct: false},
            {text: "Perplexed", correct: false},
            {text: "Exhilarating", correct: false},
        ]
    },
    {
        question: "If I could find a woman that “frugal”, I might just settle down.",
        answers: [
            {text: "Thrifty", correct: false},
            {text: "Stingy", correct: false},
            {text: "Lavish", correct: true},
            {text: "Economical", correct: false},
        ]
    },
    {
        question: "It turns out, however, their motives are not so “benevolent”.",
        answers: [
            {text: "Angry", correct: false},
            {text: "Generous", correct: true},
            {text: "Disorganized", correct: false},
            {text: "Timid", correct: false},
        ]
    },
    {
        question: "Computers are becoming increasingly “ubiquitous”.",
        answers: [
            {text: "Rare", correct: false},
            {text: "Scattered", correct: false},
            {text: "Everywhere", correct: true},
            {text: "Limited", correct: false},
        ]
    },
    {
        question: "You're a “naive” little child.",
        answers: [
            {text: "Innocent", correct: true},
            {text: "Rude", correct: false},
            {text: "Cute", correct: false},
            {text: "Mad", correct: false},
        ]
    },
    {
        question: "Remember you can always “eschew” the name in favor of just a heart.",
        answers: [
            {text: "Embrace", correct: false},
            {text: "Avoid", correct: true},
            {text: "Approach", correct: false},
            {text: "Engage", correct: false},
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
