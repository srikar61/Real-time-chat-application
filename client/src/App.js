import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Welcome from './components/Welcome';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import NotFound from './components/NotFound'; // New 404 Page Component
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import Chat from './components/Chat';
import { io } from 'socket.io-client';


function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [username, setUsername] = useState(localStorage.getItem('username')); // Add username state
  const socket = io('http://localhost:5000');

  // On component mount, retrieve authToken and username from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    setAuthToken(token);
    setUsername(storedUsername); // Set username from localStorage
  }, []);

  // Handle login by storing authToken and username in localStorage
  const handleLogin = (data) => {
    localStorage.setItem('authToken', data.token);   // Save token
    localStorage.setItem('username', data.username); // Save username

    setAuthToken(data.token);  // Set authToken state
    setUsername(data.username); // Set username state
  };

  // Handle logout by clearing authToken and username from localStorage
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');

    setAuthToken(null);  // Reset authToken state
    setUsername(null);  // Reset username state
    socket.emit('user_logout', username);
  };

  return (
    <Router>
      
      <Header authToken={authToken} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={authToken ? <Home /> : <Welcome />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/home" element={authToken ? <Home /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authToken ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authToken ? <Chat socket={socket}/> : <Navigate to="/login" />} />        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-center" // Center top position
        autoClose={1000} // Auto close after 3 seconds
        hideProgressBar={true} // Show progress bar
        newestOnTop={true} // Newest toast on top
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> 
    </Router>
  );
}

export default App;
