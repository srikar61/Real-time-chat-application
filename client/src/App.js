import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Welcome from './components/Welcome'; // Import Welcome
import Home from './components/Home'; // Import Home
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    // Check for token on page load
    const token = localStorage.getItem('authToken');
    setAuthToken(token);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  return (
    <Router>
      <Header authToken={authToken} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Welcome />} /> {/* Welcome page for unauthenticated users */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={authToken ? <Home /> : <Navigate to="/login" />} /> {/* Home after login */}
        <Route path="/profile" element={authToken ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
