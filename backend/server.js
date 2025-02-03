const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/users', userRoutes);

// Track active users
// Store active users
// Message Schema
const MessageSchema = new mongoose.Schema({
  username: String,
  text: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

// Active users object
let activeUsers = {};

io.on('connection', (socket) => {
  console.log(`✅ New connection: ${socket.id}`);

  // Emit the current list of active users when a user connects
  socket.emit('update_users', Object.values(activeUsers));

  // Load previous messages from DB when a user connects
  Message.find().sort({ timestamp: 1 }).then(messages => {
    socket.emit('load_messages', messages);
  });

  // Load all previous messages on user login
  socket.on('join_chat', (username) => {
    activeUsers[socket.id] = username;

    // Emit the active users list to everyone except the new user
    io.emit('update_users', Object.values(activeUsers));

    // Emit notification that a user has joined
    io.emit('notification', `${username} joined the chat`);

    // Query your database to get all previous messages
    Message.find().sort({ timestamp: 1 }).then(messages => {
      socket.emit('load_messages', messages);  // Send all messages to the new user
    });
  });

  socket.on('send_message', (data) => {
    if (!data.username || !data.text) return;

    const message = new Message({ username: data.username, text: data.text });
    message.save();

    io.emit('message', data);
    console.log('📩 Message received:', data);
  });

  socket.on('disconnect', () => {
    const username = activeUsers[socket.id];
    delete activeUsers[socket.id];

    // Emit updated active users list
    io.emit('update_users', Object.values(activeUsers));

    if (username) {
      io.emit('notification', `${username} left the chat`);
      console.log(`❌ ${username} left`);
    }
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
