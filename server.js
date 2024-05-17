const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const fs = require('fs');

const app = express();
const port = 8080;
const server = createServer(app);
const io = new Server(server);
app.use(express.static('public'));


let leaderboard = [];

io.on('connection', (socket) => {
    console.log("New client connected");
    socket.on('submit-results', (data) => {
        leaderboard.push(data);
        leaderboard.sort((a, b) => {
            if (a.score === b.score) {
                return a.totaltime - b.totaltime;
            }
            return b.score - a.score;
        });

        fs.writeFileSync('leaderboard.json', JSON.stringify(leaderboard, null, 2));
        io.emit('leaderboard', leaderboard);
    });
    socket.on('request-leaderboard', () => {
        io.emit('update-leaderboard', leaderboard);
    });

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
    }
);


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    });