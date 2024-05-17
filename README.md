# Web Application Development Report

**JC2503 Course Assignment**


**Student Name:** Hongyu Liu

**Student ID:** 50087470


## Table of Contents

1. [Introduction](#introduction)
2. [Website Design Overview](#website-design-overview)
   - [Overall Design](#1-overall-design)
    - [Design of the Navigation Bar](#2-design-of-the-navigation-bar)
    - [Design of the Quiz Application](#3-design-of-the-quiz-application)
3. [Development Challenges](#development-challenges)
   - [Challenges Faced](#challenges-faced)
   - [Solutions and Overcoming the Challenges](#solutions-and-overcoming-the-challenges)
4. [Technical Details](#technical-details-of-server-client-communication)
   - [Server-Side Logic](#server-side-logic)
   - [Client-Side Interaction](#client-side-interaction)
5. [Conclusion](#conclusion)
6. [References](#references)

## Introduction

In this assignment, I have created a simple yet engaging website that showcases information about myself and includes an interactive quiz application. The website is built using HTML, CSS, and JavaScript, also I used the package Socket.io and Express to implement the server-client communication and allow user to run my website on the localhost through `npm start` command.
One of the key features of my website is its clean and simple design. I have opted for a dark theme, which not only provides a modern and sleek look but also enhances readability. In addition to its design, the website also focuses on providing a convenient and interactive user experience. The About page includes engaging sections that highlight my hobbies, personality, achievements, and professional interests. These sections are presented in an easy-to-read format, making it effortless for visitors to learn more about me.

The quiz page is another notable feature of the website. Developed using JavaScript, the quiz offers an interactive way for users to engage with the content. Upon entering their name, users can start the quiz and test their knowledge. The quiz questions are dynamically populated, and the user's score is displayed at the end, providing an enjoyable and educational experience.

## Website Design Overview

### 1. Overall Design

The website contains three main pages: the Home page, the About page, and the quiz page. Each page is designed to be visually appealing and easy to navigate, ensuring a seamless user experience. The website is responsive and adapts to different screen sizes, making it accessible on a variety of devices.

The views of the website are below:
![Home Page](/images/Home.png)
![About Page](/images/About-me.png)
![Quiz Page](/images/Quiz.png)

### 2. Design of the Navigation Bar

 I have applied a efficient nevigational bar on each pages to allow users to switch between pages easily. The navigation bar is fixed at the top of the page, ensuring that it is always accessible to users. The navigation bar includes links to the home page, the about-me page, and the quiz page, allowing users to quickly navigate to the desired section of the website.

 ``` html
        <nav>
            <ul>
                <li><a id="home-link" href="index.html">Home</a></li>
                <li><a id="about-link" href="About.html">About-Me</a></li>
                <li><a id="quiz-link" href="quiz.html">Quiz</a></li>
            </ul>
        </nav>
 ```
And I also used Javascript to make the navigation bar more interactive and user-friendly. When the user hovers over a link, the text color changes to indicate that it is clickable. This visual feedback helps users understand that the navigation bar is interactive and encourages them to explore different sections of the website.

 ``` javascript
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split("/").pop();

    switch (currentPath) {
        case 'index.html':
            document.getElementById('home-link').classList.add('current-page');
            break;
        case 'About.html':
            document.getElementById('about-link').classList.add('current-page');
            break;
        case 'quiz.html':
            document.getElementById('quiz-link').classList.add('current-page');
            break;
        default:
            break;
    }
});

 ```

### 3. Design of the Quiz Application
- **Question Presentation**: The quiz application presents questions one at a time, allowing users to focus on each question without feeling overwhelmed. It dynamically generates questions from a predefined set of questions. 
- **User Input**: Users can select an answer for each question by clicking on the corresponding radio button. The quiz application ensures that only one answer can be selected for each question.
- **Scoring**: The quiz application evaluates the user's responses and calculates the final score based on the number of correct answers. The score is displayed to the user at the end of the quiz, providing instant feedback on their performance.
- **Timer**: The quiz application includes a timer that counts down as the user answers each question. This adds an element of challenge and urgency to the quiz. If the user runs out of time, the quiz automatically moves to the next question and marks the current question as wrong. The total time taken to complete the quiz is also displayed to the user at the end.
- **Feedback**: After completing each question, the user receives immediate feedback on whether their answer was correct or incorrect. This feedback helps users understand their progress and learn from their mistakes.

- **Leaderboard**: The quiz application includes a leaderboard that displays the top scores achieved by users. It is achieved by storing the user's name and score in leaderboard.json file.


## Development Challenges

### Challenges Faced

- **Dynamic Question Generation**: One of the challenges I faced was dynamically generating questions for the quiz application. I initially struggled with how to structure the questions and answers in a way that would allow for easy retrieval and presentation.

- **Bug Fixing**: Another challenge was identifying and fixing bugs in the quiz application. I encountered issues with the timer not functioning correctly and also the button have no response when the user click on it.

- **Server-Client Communication**: Implementing real-time communication between the server and client using Socket.io was also a challenge. I had to ensure that the data sent between the client and server was accurate and that the leaderboard was updated correctly.

### Solutions and Overcoming the Challenges

- **Dynamic Question Generation**: 
To overcome this challenge, I created an array of objects, with each object representing a question and its corresponding answers. This allowed me to easily iterate over the array and present the questions to the user.

- **Bug Fixing**:
To address the bugs in the quiz application, I used the browser's developer tools to debug the code and identify the root cause of the issues. I also used console.log statements to log the values of variables and functions, helping me understand the flow of the code and pinpoint the bugs.

- **Server-Client Communication**:
To ensure accurate communication between the server and client, I used Socket.io to establish a WebSocket connection. This allowed me to send and receive data in real-time, ensuring that the leaderboard was updated correctly. I also implemented error handling to catch any issues that may arise during communication.

## Technical Details of Server-Client communication 

### Client-Side Interaction
1. The client sends the user's name, score, and time taken to complete the quiz to the server using Socket.io. This data is then stored in the leaderboard.json file in server.
2. Also the client can request the leaderboard from the server and the server will send the updated leaderboard to all connected clients.
``` javascript 
// Client submit the results to the server
socket.emit('submit-results', { name: userName, score, totaltime });


// client sent request to server to get the leaderboard
socket.emit('request-leaderboard');
socket.on('update-leaderboard', (leaderboard) => {
        leaderboard.sort((a, b) => {
            if (a.score === b.score) {
                return parseFloat(a.totaltime) - parseFloat(b.totaltime);
            }
            return b.score - a.score;
        });
});
```
### Server-Side Logic
1. The server listens for the 'submit-results' event from the client and stores the user's name, score, and time taken to complete the quiz in the leaderboard.json file.
2. The server also listens for the 'request-leaderboard' event from the client and sends the updated leaderboard to all connected clients.
``` javascript
io.on('connection', (socket) => {
    console.log("New client connected");
    socket.on('submit-results', (data) => { // server listen to the submit-results event from client
        leaderboard.push(data);
        leaderboard.sort((a, b) => {
            if (a.score === b.score) {
                return a.totaltime - b.totaltime;
            }
            return b.score - a.score;
        });
        // write the updated leaderboard to the leaderboard.json file
        fs.writeFileSync('leaderboard.json', JSON.stringify(leaderboard, null, 2));
        io.emit('leaderboard', leaderboard);
    });
    // server listen to the request-leaderboard event from client
    socket.on('request-leaderboard', () => {
        io.emit('update-leaderboard', leaderboard);
    });

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});
```

## Conclusion
In conclusion, this assignment has provided me with valuable experience in web application development. I have learned how to create a responsive and interactive website using HTML, CSS, and JavaScript. I have also gained insights into server-client communication using Socket.io, which has enabled me to implement real-time features such as the quiz application and leaderboard.


## References
- [Socket.io Documentation](https://socket.io/docs/v4/)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
