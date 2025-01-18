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

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
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
        <Route path="/" element={authToken ? <Home /> : <Welcome />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/home" element={authToken ? <Home /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authToken ? <Profile /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-center" // Center top position
        autoClose={1100} // Auto close after 3 seconds
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
