const questions = [
    {
        question: "What is the synonym of “advance”?",
        answers: [
            {text: "Discuss", correct: false},
            {text: "Traffic", correct: false},
            {text: "Proceed", correct: true},
            {text: "Contain", correct: false},
        ]
    },
    {
        question: "It refers to a form or instance of something that involves more than one.",
        answers: [
            {text: "Singular", correct: false},
            {text: "Plural", correct: true},
            {text: "Conjunction", correct: false},
            {text: "Noun", correct: false},
        ]
    },
    {
        question: "What is the synonym of “flee”?",
        answers: [
            {text: "Man", correct: false},
            {text: "Oak", correct: false},
            {text: "Ace", correct: false},
            {text: "Run", correct: true},
        ]
    },
    {
        question: "It refers to words that have similar things.",
        answers: [
            {text: "Antonym", correct: false},
            {text: "Synonym", correct: true},
            {text: "Preposition", correct: false},
            {text: "Verb", correct: false},
        ]
    },
    {
        question: "It is a noun, pronoun, or phrase that receives the action of the verb or is affected by the action.",
        answers: [
            {text: "Object", correct: true},
            {text: "Subject", correct: false},
            {text: "Noun", correct: false},
            {text: "Pronoun", correct: false},
        ]
    },
    {
        question: "_____ is an action word",
        answers: [
            {text: "Noun", correct: false},
            {text: "Pronoun", correct: false},
            {text: "Verb", correct: true},
            {text: "Adjective", correct: false},
        ]
    },
    {
        question: "It is a word used to connect clauses or sentences or to coordinate words.",
        answers: [
            {text: "Conjunction", correct: true},
            {text: "Past Tense", correct: false},
            {text: "Personification", correct: false},
            {text: "Hyperbole", correct: false},
        ]
    },
    {
        question: "It is a short fictitious story that illustrate a moral attitude or a religious principle.",
        answers: [
            {text: "Short Story", correct: false},
            {text: "Novel", correct: false},
            {text: "Poem", correct: false},
            {text: "Parable", correct: true},
        ]
    },
    {
        question: "“Like” or “As” use in what type of figurative language?",
        answers: [
            {text: "Simile", correct: true},
            {text: "Personification", correct: false},
            {text: "Hyperbole", correct: false},
            {text: "Oxymoron", correct: false},
        ]
    },
    {
        question: "It is a spoken or written account of connected events; a story: “a gripping narrative” Word with similar meanings account, story, tale, chronicle, history, description, record.",
        answers: [
            {text: "Interogative Speech", correct: false},
            {text: "Narrative Speech", correct: true},
            {text: "Persuasive Speech", correct: false},
            {text: "Impromptu Speech", correct: false},
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
