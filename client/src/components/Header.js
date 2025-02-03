import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
const Header = ({ authToken, onLogout }) => {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(false); // Close the modal
    onLogout(); // Perform logout
    toast.success('Logout successful!');
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg shadow-sm"
        style={{
          background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
          color: '#fff',
        }}
      >
        <div className="container">
          <Link
            className="navbar-brand text-white"
            to={authToken ? '/home' : '/'}
            style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
          >
            <strong>Quick Chat</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              {authToken ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/home">
                      <i className="fas fa-home"></i> Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/chat">
                      <i className="fas fa-user-circle"></i> Chat
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/profile">
                      <i className="fas fa-user-circle"></i> Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/aboutus">
                      <i className="fas fa-info-circle"></i> About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      style={{ color: '#d9534f', fontWeight: 'bold' }}
                      onClick={() => setShowModal(true)} // Open modal
                    >
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/">
                      <i className="fas fa-home"></i> Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/login">
                      <i className="fas fa-sign-in-alt"></i> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/signup">
                      <i className="fas fa-user-plus"></i> Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/aboutus">
                      <i className="fas fa-info-circle"></i> About Us
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Enhanced Logout Confirmation Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: 'block',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
              }}
            >
              <div
                className="modal-header"
                style={{
                  backgroundColor: '#f76c6c',
                  color: '#fff',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
              >
                <h5 className="modal-title" style={{ fontWeight: 'bold' }}>
                  Confirm Logout
                </h5>
              </div>
              <div
                className="modal-body text-center"
                style={{
                  padding: '2rem',
                  fontSize: '1.2rem',
                  color: '#333',
                }}
              >
                <i
                  className="fas fa-exclamation-circle"
                  style={{
                    fontSize: '3rem',
                    color: '#f76c6c',
                    marginBottom: '1rem',
                  }}
                ></i>
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{
                    borderRadius: '20px',
                    padding: '0.5rem 2rem',
                  }}
                  onClick={() => setShowModal(false)} // Close modal
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-3"
                  style={{
                    borderRadius: '20px',
                    padding: '0.5rem 2rem',
                  }}
                  onClick={handleLogout} // Perform logout
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
