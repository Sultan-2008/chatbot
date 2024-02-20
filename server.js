const express = require('express');
const http = require('http'); // require http module
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app); // create http server
const io = socketIO(server); // initialize socket.io with http server

app.use(express.static(__dirname + '/public'));

app.get('/', (req, resp) => {
    resp.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
    console.log(`Server is running on localhost:${3000}`);
});

// Socket code.
io.on('connection', (socket) => {
    console.log('connected...');
    socket.on('message', (msg)=>{
        socket.broadcast.emit('message', msg)
    })
});

