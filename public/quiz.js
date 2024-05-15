document.addEventListener("DOMContentLoaded", function(){
    initQuiz();
});


const quizData = [
    {
        question: "What is my favorite color?",
        options: ["Red", "Blue", "Green", "Yellow"],
        answer: "Blue"
    },
    {
        question: "What is my favorite food?",
        options: ["Pizza", "Burger", "Pasta", "Salad"],
        answer: "Pizza"
    },
    {
        question: "What is my favorite movie?",
        options: ["Inception", "Interstellar", "The Dark Knight", "Tenet"],
        answer: "Interstellar"
    },
    {
        question: "What is my favorite basketball player?",
        options: ["Lebron James", "Kobe Bryant", "Russell Westbrook", "Stephen Curry"],
        answer: "Russell Westbrook"
    },
    {
        question: "What is my dream job?",
        options: ["Software Engineer", "Data Scientist", "Product Manager", "CEO"],
        answer: "CEO"
    }
]


let currentQuestion = 0;
let score = 0;


function initQuiz(){
    showQuestion();
}


function showQuestion(){
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("next-question");
    const submitButton = document.getElementById("submit");
    const questionData = quizData[currentQuestion];

    if (questionData){
        questionElement.innerHTML = questionData.question;
        optionsContainer.innerHTML = questionData.options.map(option => `
        <button class="option-button" onclick="selectOption('${option}', this)">
            <input type="radio" name="answer" value="${option}">
            <label>${option}</label>
        </button>
    `).join('');

        if (currentQuestion === quizData.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'block';
        } else {
            nextButton.style.display = 'block';
            submitButton.style.display = 'none';
        }
    }
    else {
        showResults();
    }
}

function selectOption(selectedOption, buttonElement) {
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach(radio => {
        if (radio.value === selectedOption) {
            radio.checked = true;
        }
    });

    // Highlight selected button for visual feedback
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        button.classList.remove('selected');
    });
    buttonElement.classList.add('selected');
}

function submitAnswer(){
    const answer = document.querySelector('input[name="answer"]:checked');

    if (answer){
        if (answer.value === quizData[currentQuestion].answer){
            score++;
        }
        currentQuestion++;
        showQuestion();
    }
    else {
        alert("Please select an answer");
    }
}

function showResults(){
    const quizElement = document.getElementById("quiz");
    quizElement.innerHTML = `
        <h1>Quiz Completed</h1>
        <p>Your score: ${score}/${quizData.length}</p>
    `;
}