import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    accountName: '',
    dob: '',
    city: '',
    gender: '',
    mobile: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/signup', formData);
      alert('Signup successful!');
      navigate('/login'); // Redirect to the login page after successful signup
    } catch (error) {
      alert('Failed to sign up');
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="w-50 mx-auto p-3 border rounded">
        <h2 className="text-center mb-4">Signup</h2>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Account Name</label>
          <input
            type="text"
            className="form-control"
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            placeholder="Enter account name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input
            type="tel"
            className="form-control"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            pattern="[0-9]{10}"
            title="Enter a 10-digit mobile number"
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
