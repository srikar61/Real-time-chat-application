import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="text-center">
      <h1>Welcome to Quick Chat</h1>
      <p>This is the landing page for our Real-time Chat App. Connect with friends and colleagues in real-time. Get started by logging in or signing up.</p>
      <Link to="/login" className="btn btn-primary">Login</Link>
      <Link to="/signup" className="btn btn-secondary ms-2">Sign Up</Link>
    </div>
  </div>
);

export default Welcome;
