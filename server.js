const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files
app.use(express.static('public'));

// Handle socket connections
io.on('connection', socket => {
    console.log('A user connected');

    // Receive message from client
    socket.on('send-message', message => {
        // Broadcast the message to all connected clients
        io.emit('chat-message', message);
    });

    // Handle socket disconnections
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
