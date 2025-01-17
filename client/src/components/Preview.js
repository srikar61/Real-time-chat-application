import React from 'react';
import { Link } from 'react-router-dom';

function Preview() {
  return (
    <div className="container mt-5 text-center">
      <h2>Welcome to the Chat App</h2>
      <p>Please log in or sign up to continue</p>
      <div>
        <Link to="/login" className="btn btn-primary me-2">Login</Link>
        <Link to="/signup" className="btn btn-secondary">Signup</Link>
      </div>
    </div>
  );
}

export default Preview;
