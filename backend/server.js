const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your frontend's origin code
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());

// Store messages for each room
const roomMessages = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle joining a room
  socket.on('join_room', (roomCode) => {
    socket.join(roomCode);

    // Send previous messages to the newly joined user
    const previousMessages = roomMessages[roomCode] || [];
    socket.emit('load_previous_messages', previousMessages);

    console.log(`User ${socket.id} joined room: ${roomCode}`);
  });

  // Handle sending a message
  socket.on('send_message', ({ encryptedMessage, roomCode }) => {
    if (!roomMessages[roomCode]) {
      roomMessages[roomCode] = [];
    }
    roomMessages[roomCode].push(encryptedMessage);

    // Broadcast the message to everyone in the room
    io.to(roomCode).emit('receive_message', encryptedMessage);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
