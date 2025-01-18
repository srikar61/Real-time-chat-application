import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h1
        style={{
          fontSize: '6rem',
          fontWeight: 'bold',
          color: '#ff6b6b',
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: '1.5rem',
          color: '#555',
          marginBottom: '2rem',
        }}
      >
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="btn btn-primary"
        style={{
          padding: '0.75rem 2rem',
          fontSize: '1.2rem',
          borderRadius: '30px',
          background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
          border: 'none',
        }}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
