import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => (
  <div className="container mt-5">
    <h1>Welcome to MyApp</h1>
    <p>This is the landing page.</p>
    <Link to="/login" className="btn btn-primary">Login</Link>
    <Link to="/signup" className="btn btn-secondary ms-2">Sign Up</Link>
  </div>
);

export default Welcome;
