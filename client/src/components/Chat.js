import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import CryptoJS from 'crypto-js';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io('http://localhost:3001');

function Chat({ username, roomCode }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Join the room
    socket.emit('join_room', roomCode);

    // Load previous messages
    socket.on('load_previous_messages', (previousMessages) => {
      setMessages(
        previousMessages.map((msg) => {
          try {
            return JSON.parse(
              CryptoJS.AES.decrypt(msg, roomCode).toString(CryptoJS.enc.Utf8)
            );
          } catch {
            return { username: 'Error', text: 'Failed to decrypt', timestamp: new Date() };
          }
        })
      );
    });

    // Listen for new messages
    socket.on('receive_message', (encryptedMessage) => {
      try {
        const decryptedMessage = JSON.parse(
          CryptoJS.AES.decrypt(encryptedMessage, roomCode).toString(CryptoJS.enc.Utf8)
        );
        setMessages((prev) => [...prev, decryptedMessage]);
      } catch {
        console.error('Failed to decrypt message');
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off('load_previous_messages');
      socket.off('receive_message');
    };
  }, [roomCode]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const message = { username, text: input.trim(), timestamp: new Date() };
      const encryptedMessage = CryptoJS.AES.encrypt(
        JSON.stringify(message),
        roomCode
      ).toString();
      socket.emit('send_message', { encryptedMessage, roomCode });
      setInput('');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Room Code: {roomCode}</h2>
      <div
        className="chat-box border rounded p-3 mb-3"
        style={{ minHeight:'200px',maxHeight: '400px', overflowY: 'auto', backgroundColor: '#f8f9fa' }}
      >
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.username}:</strong> {msg.text}
            <span className="text-muted ms-2" style={{ fontSize: '0.8rem' }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <form className="d-flex" onSubmit={sendMessage}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
