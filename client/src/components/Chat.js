import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const socket = io('http://localhost:5000');

const Chat = () => {
  const storedUsername = localStorage.getItem('username') || `User${Math.floor(Math.random() * 1000)}`;
  localStorage.setItem('username', storedUsername);

  const [username] = useState(storedUsername);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit('join_chat', username);

    socket.on('load_messages', (messages) => {
      setMessages(messages);
    });

    socket.on('message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on('notification', (note) => {
      toast.info(note, { position: 'top-center' });
    });

    socket.on('update_users', (activeUsers) => {
      setUsers(activeUsers);
    });

    return () => {
      socket.off('message');
      socket.off('load_messages');
      socket.off('notification');
      socket.off('update_users');
    };
  }, [username]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = { username, text: message };
      socket.emit('send_message', newMessage);
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar for Active Users */}
      <div style={styles.sidebar}>
        <h3>Active Users</h3>
        <ul style={styles.userList}>
          {users.map((user, index) => (
            <li key={index} style={styles.userItem}>
              {user}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Section */}
      <div style={styles.main}>
        <h2>Real-Time Chat</h2>

        {/* Chat Box with Custom Scrollbar */}
        <div style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div key={index} style={{ 
              ...styles.message, 
              backgroundColor: msg.username === username ? '#007bff' : '#ddd', 
              color: msg.username === username ? 'white' : 'black',
              alignSelf: msg.username === username ? 'flex-end' : 'flex-start' 
            }}>
              <strong>{msg.username}:</strong> {msg.text}
            </div>
          ))}
        </div>

        {/* Chat Input Section */}
        <div style={styles.chatInput}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            style={styles.input}
          />
          <button onClick={sendMessage} style={styles.button}>Send</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    display: 'flex', 
    height: '100vh', 
    background: '#f4f4f4', 
    overflow: 'hidden'  // Hides the main scrollbar
  },

  sidebar: { 
    width: '25%', 
    background: '#222', 
    color: 'white', 
    padding: '20px', 
    overflowY: 'auto' 
  },

  userList: { listStyle: 'none', padding: 0 },

  userItem: { 
    padding: '10px', 
    background: '#333', 
    margin: '5px 0', 
    borderRadius: '5px' 
  },

  main: { 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    padding: '20px' 
  },

  chatBox: { 
    flex: 1, 
    overflowY: 'auto', 
    padding: '10px', 
    background: 'white', 
    borderRadius: '5px', 
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxHeight: '70vh',  // Prevents it from taking full screen
    scrollbarWidth: 'thin',  // Modern scroll behavior
    scrollbarColor: '#007bff #ddd'  // Scrollbar color
  },

  message: { 
    padding: '10px', 
    borderRadius: '5px', 
    margin: '5px 0', 
    maxWidth: '70%' 
  },

  chatInput: { 
    display: 'flex', 
    marginTop: '10px' 
  },

  input: { 
    flex: 1, 
    padding: '10px', 
    border: 'none', 
    borderRadius: '5px', 
    marginRight: '5px' 
  },

  button: { 
    padding: '10px', 
    background: '#28a745', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer' 
  },
};

export default Chat;
