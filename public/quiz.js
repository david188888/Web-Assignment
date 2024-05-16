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
let timeLeft = 10;
let startTime = 0;
const socket = io('http://localhost:8080');
let timeInterval;


function initQuiz() {
    document.getElementById("name-input-container").style.display = 'block';
    document.getElementById("submit-answer").style.display = 'none';
    document.getElementById("submit").style.display = 'none';
}


function startQuiz() {
    userName = document.getElementById("name").value;
    if (userName === "") {
        alert("Please enter your name");
        return;
    }
    startTime = new Date().getTime(); 
    document.getElementById("name-input-container").style.display = 'none';
    document.getElementById("submit-answer").style.display = 'block';
    showQuestion();
}

function nextQuestion() {
    showQuestion();
}



function showQuestion() {
    if (currentQuestion < quizData.length) {
        timeLeft = 10;
        const questionElement = document.getElementById("question");
        const optionsContainer = document.getElementById("options-container");
        const nextButton = document.getElementById("submit-answer");
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
        clearInterval(timeInterval);
        feedbackElement.innerHTML = '';
        feedbackElement.className = 'feedback';
        nextQuestionBtn.style.display = 'none';
        nextButton.style.display = 'block';
        document.getElementById("timer").style.display = 'block';
        startTimer();
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

function submitAnswer() {
    const answer = document.querySelector('input[name="answer"]:checked');
    const submitButton = document.getElementById("submit");
    const feedbackElement = document.getElementById("feedback");
    const nextQuestionBtn = document.getElementById("next-question-btn");
    const nextButton = document.getElementById("submit-answer");
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");

    if (answer) {
        clearInterval(timeInterval);
        document.getElementById("timer").style.display = 'none';
        questionElement.innerHTML = '';
        optionsContainer.innerHTML = '';
        if (answer.value === quizData[currentQuestion].answer) {
            score++;
            feedbackElement.innerHTML = "Your answer is correct!";
            feedbackElement.classList.add('correct');
        }
        else {
            feedbackElement.innerHTML = `Your answer is incorrect!`;
            feedbackElement.classList.add('incorrect');
        }
        currentQuestion++;
        if (currentQuestion === quizData.length) {
            nextQuestionBtn.style.display = 'none';
            nextButton.style.display = 'none';
            submitButton.style.display = 'block';
        }
        else {
        nextQuestionBtn.style.display = 'block';
        nextButton.style.display = 'none';
        }   

}

    else if (timeLeft <= 0){
        clearInterval(timeInterval);

        document.getElementById("timer").style.display = 'none';
        clearInterval(timeInterval);
        questionElement.innerHTML = '';
        optionsContainer.innerHTML = '';
        feedbackElement.innerHTML = "Time's up! Your answer is incorrect!";
        feedbackElement.classList.add('incorrect');
        currentQuestion++;
        if (currentQuestion === quizData.length) {
            nextQuestionBtn.style.display = 'none';
            nextButton.style.display = 'none';
            submitButton.style.display = 'block';
        }
        else {
        nextQuestionBtn.style.display = 'block';
        nextButton.style.display = 'none';
        }   
    }

    else if (!answer && timeLeft > 0){
    nextButton.style.display = 'block';
    nextQuestionBtn.style.display = 'none';
    document.getElementById("alertBox").style.display = 'block'; 
    setTimeout(() => { 
        document.getElementById("alertBox").style.display = 'none';
    }, 1000);
    return;
}

    let alltime = 0;
    let endTime = new Date().getTime();
    let timetoken = (endTime - startTime);
    alltime += timetoken;
    let seconds = Math.floor(alltime / 1000); 
    let milliseconds = alltime % 1000; 
    totaltime = `${seconds}. ${milliseconds}`;
}

function showResults() {
    const totalTime = totaltime;
    const quizElement = document.getElementById("quiz");
    quizElement.innerHTML = `
    <h1>Quiz Completed</h1>
    <p>Your score: ${score}</p>
    <p>Total time: ${totalTime} seconds</p>
`;
socket.emit('submit-results', { name: userName, score, totaltime });
displayLeaderboard();
}

// ... 其他 JavaScript ...

function displayLeaderboard() {
    socket.emit('request-leaderboard');
    socket.on('update-leaderboard', (leaderboard) => {
        leaderboard.sort((a, b) => {
            if (a.score === b.score) {
                return parseFloat(a.totaltime) - parseFloat(b.totaltime);
            }
            return b.score - a.score;
        });

        const leaderboardBody = document.getElementById("leaderboard-body");
        leaderboardBody.innerHTML = ''; 

        let currentRank = 0;
        let prevScore = -1;
        let prevTime = Number.MAX_VALUE;
        leaderboard.forEach((user, index) => {
            if (user.score !== prevScore || parseFloat(user.totaltime) !== prevTime) {
                currentRank = index + 1;
                prevScore = user.score;
                prevTime = parseFloat(user.totaltime);
            }
            const row = `
                <tr>
                    <td>${currentRank}</td> 
                    <td>${user.name}</td>
                    <td>${user.score}</td>
                    <td>${user.totaltime} seconds</td>
                </tr>
            `;
            leaderboardBody.innerHTML += row; 
        });

        document.getElementById("leaderboard").style.display = 'block';
    });
}




function startTimer() {
    document.getElementById("timer").innerText = `Time to answer: ${timeLeft} seconds`;
    timeInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time to answer:  ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            submitAnswer();
            timeLeft = 10;
        }
    }, 1000);
}


function submitAnswerfinal(){
    const submitbt = document.getElementById("submit");
    const nextquestionBtn = document.getElementById("next-question-btn");
    clearInterval(timeInterval);

    
    nextquestionBtn.style.display = 'none';
    submitbt.style.display = 'block';
    showResults();
}