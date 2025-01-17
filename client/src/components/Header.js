import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ authToken, onLogout }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid">
      <Link className="navbar-brand" to={authToken ? "/home" : "/"}>
        MyApp
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {authToken ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <i className="fas fa-user-circle"></i> Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">
                  <i className="fas fa-info-circle"></i> About
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link text-white" onClick={onLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  <i className="fas fa-user-plus"></i> Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">
                  <i className="fas fa-info-circle"></i> About
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
