const questions = [
    {
        question: "Which of the following sentences best demonstrates the meaning of the word intervene?",
        answers: [
            {text: "Allison was wearing her old hoodie to the dance.", correct: false},
            {text: "Paula's plan would have worked out if Sara hadn't stepped in.", correct: true},
            {text: "Matt felt blindly for the light switch.", correct: false},
            {text: "Norman tried to steal the car.", correct: false},
        ]
    },
    {
        question: "Which of the following sentences best demonstrates the meaning of the word formidable?",
        answers: [
            {text: "She ate a sandwich very quickly.", correct: false},
            {text: "The pitcher for the other team had an impressive record.", correct: true},
            {text: "The moon looked so clear and beautiful.", correct: false},
            {text: "She sent her friend a message right after school.", correct: false},
        ]
    },
    {
        question: "Maria is an audacious person. She is ______?",
        answers: [
            {text: "worthless", correct: false},
            {text: "unusual", correct: false},
            {text: "bold", correct: true},
            {text: "powerful", correct: false},
        ]
    },
    {
        question: "She felt sublime standing out in the rain. She felt_____?",
        answers: [
            {text: "terrible", correct: false},
            {text: "amazing", correct: true},
            {text: "stupid", correct: false},
            {text: "weird", correct: false},
        ]
    },
    {
        question: "The synonym of SURPASS",
        answers: [
            {text: "go beyond", correct: true},
            {text: "argue with", correct: false},
            {text: "introduce gradually", correct: false},
            {text: "divide into portions", correct: false},
        ]
    },
    {
        question: "The synonym of FASTIDIOUS",
        answers: [
            {text: "possible", correct: false},
            {text: "creative", correct: false},
            {text: "occasional", correct: false},
            {text: "careful", correct: false},
        ]
    },
    {
        question: "The synonym of DISGRUNTLED",
        answers: [
            {text: "grumpy", correct: true},
            {text: "strange", correct: false},
            {text: "useless", correct: false},
            {text: "complicated", correct: false},
        ]
    },
    {
        question: "The antonym of HUMANE",
        answers: [
            {text: "admirable", correct: false},
            {text: "unbelievable", correct: false},
            {text: "cruel", correct: true},
            {text: "unknown", correct: false},
        ]
    },
    {
        question: "The antonym of ECCENTRIC",
        answers: [
            {text: "essential", correct: false},
            {text: "interested", correct: false},
            {text: "awkward", correct: false},
            {text: "normal", correct: true},
        ]
    },
    {
        question: "The antonym of FLUSTERED",
        answers: [
            {text: "calm", correct: true},
            {text: "confused", correct: false},
            {text: "causing fear", correct: false},
            {text: "well-fed", correct: false},
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
