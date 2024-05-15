document.addEventListener("DOMContentLoaded", function () {
    initQuiz();
});


const quizData = [
    // The question is about general knowledge
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "London", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which of the following is a mammal?",
        options: ["Shark", "Turtle", "Dolphin", "Octopus"],
        answer: "Dolphin"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "What is the largest country in the world?",
        options: ["China", "Canada", "Russia", "United States"],
        answer: "Russia"
    },
    {
        question: "Which food is not belong to the Chinese cuisine?",
        options: ["Sushi", "Dumplings", "Spicy Hot Pot", "Peking Duck"],
        answer: "Sushi"
    },
    {
        question: "What is the smallest ocean in the world?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Arctic Ocean"
    },
    {
        question: "Which of the following options is not an essential element of web development?",
        options: ["HTML", "CSS", "Python", "JavaScript"],
        answer: "Python"
    },
    {
        question: "Which of the following is not a programming language?",
        options: ["Java", "C++", "HTML", "Ruby"],
        answer: "HTML"
    },
    {
        question: "Which of the following tourist attractions is in China?",
        options: ["Eiffel Tower", "Taj Mahal", "Great Wall of China", "Statue of Liberty"],
        answer: "Great Wall of China"
    },
    {
        question: "What day is Christmas?",
        options: ["December 25", "November 25", "October 25", "September 25"],
        answer: "December 25"
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Antarctic Desert"],
        answer: "Antarctic Desert"
    }
]


let currentQuestion = 0;
let score = 0;
let userName = "";
let totaltime = 0;
let timetraveral;
let starTime;
const socket = io('http://localhost:8080');


function initQuiz() {
    document.getElementById("name-input-container").style.display = 'block';
    document.getElementById("next-question").style.display = 'none';
    document.getElementById("submit").style.display = 'none';
}


function startQuiz() {
    userName = document.getElementById("name").value;
    console.log("User name: ", userName);
    if (userName === "") {
        alert("Please enter your name");
        return;
    }
    document.getElementById("name-input-container").style.display = 'none';
    document.getElementById("next-question").style.display = 'block';
    showQuestion();
}

function nextQuestion() {
    showQuestion();
}



function showQuestion() {
    if (currentQuestion < quizData.length) {
        const questionElement = document.getElementById("question");
        const optionsContainer = document.getElementById("options-container");
        const nextButton = document.getElementById("next-question");
        const submitButton = document.getElementById("submit");
        const feedbackElement = document.getElementById("feedback");
        const nextQuestionBtn = document.getElementById("next-question-btn");
        const questionData = quizData[currentQuestion];
        questionElement.innerHTML = questionData.question;


        optionsContainer.innerHTML = questionData.options.map(option => `
        <button class="option-button" onclick="selectOption('${option}', this)">
            <input type="radio" name="answer" value="${option}">
            <label>${option}</label>
        </button>
    `).join('');

        feedbackElement.innerHTML = '';
        feedbackElement.className = 'feedback';
        nextQuestionBtn.style.display = 'none';

        if (currentQuestion === quizData.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'block';
        } else {
            nextButton.style.display = 'block';
            submitButton.style.display = 'none';
        }
        startTimer();
        console.log("User name: ", userName);
    }
    else {
        const nextQuestionBtn = document.getElementById("next-question-btn");
        if (nextQuestionBtn){
            nextQuestionBtn.style.display = 'none';
        }
        console.log("User name: ", userName);
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

function submitAnswer() {
    const answer = document.querySelector('input[name="answer"]:checked');
    const submitButton = document.getElementById("submit");
    clearInterval(timerInterval);
    const feedbackElement = document.getElementById("feedback");
    const nextQuestionBtn = document.getElementById("next-question-btn");
    const nextButton = document.getElementById("next-question");
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");

    questionElement.innerHTML = '';
    optionsContainer.innerHTML = '';


    if (answer) {
        if (answer.value === quizData[currentQuestion].answer) {
            score++;
            feedbackElement.innerHTML = "Your answer is correct!";
            feedbackElement.classList.add('correct');
        }
        else {
            feedbackElement.innerHTML = `Your answer is incorrect!`;
            feedbackElement.classList.add('incorrect');
        }
    }
    else {
        feedbackElement.innerHTML = "Time's up! Your answer is incorrect!";
        feedbackElement.classList.add('incorrect');
        submitButton.style.display = 'none';
        
    }
    nextQuestionBtn.style.display = 'block';
    nextButton.style.display = 'none';
    totaltime += (10 - parseInt(document.getElementById("timer").innerText.split(" ")[3]));
    currentQuestion++;
}

function showResults() {
    const totalTime = totaltime;
    const quizElement = document.getElementById("quiz");
    quizElement.innerHTML = `
    <h1>Quiz Completed</h1>
    <p>Your score: ${score}/${quizData.length}</p>
    <p>Total time: ${totalTime} seconds</p>
`;
console.log("User name: ", userName);
socket.emit('submit-results', { name: userName, score, totaltime });
displayLeaderboard();
}

function displayLeaderboard(){
    socket.emit('request-leaderboard');
    socket.on('update-leaderboard', (leaderboard) => {
        const leaderboardList = document.getElementById("leaderboard-list");
        leaderboardList.innerHTML = leaderboard.map(user => `
        <li>${user.name} - Score: ${user.score} - Time: ${user.totaltime} seconds</li>
    `).join('');
    document.getElementById("leaderboard").style.display = 'block';
    });
}


function startTimer() {
    let timeLeft = 10;
    document.getElementById("timer").innerText = `Time to answer: ${timeLeft} seconds`;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Tima to answer:  ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitAnswer();
        }
    }, 1000);
}