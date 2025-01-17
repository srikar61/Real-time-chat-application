import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import CryptoJS from 'crypto-js';
import 'bootstrap/dist/css/bootstrap.min.css';
const socket = io.connect('http://localhost:3001');

function Chat() {
  const { room } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('join_room', room);

    socket.on('receive_message', (encryptedMessage) => {
      const bytes = CryptoJS.AES.decrypt(encryptedMessage, 'secret_key');
      const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
      setMessages((prevMessages) => [...prevMessages, decryptedMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);

  const sendMessage = () => {
    const encryptedMessage = CryptoJS.AES.encrypt(message, 'secret_key').toString();
    socket.emit('send_message', { encryptedMessage, room });
    setMessages((prevMessages) => [...prevMessages, message]);
    setMessage('');
  };

  return (
    <div className="container">
      <h2>Chat Room: {room}</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="form-control"
        placeholder="Type your message..."
      />
      <button className="btn btn-primary mt-2" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default Chat;
