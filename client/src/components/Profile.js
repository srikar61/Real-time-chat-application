import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        alert('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        'http://localhost:5000/api/users/profile',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data.user);
      setEditMode(false);
      alert('Profile updated successfully');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('authToken');
      alert('Profile deleted successfully');
      navigate('/signup');
    } catch (error) {
      alert('Failed to delete profile');
    }
  };

  if (!user) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card p-3">
        <h2 className="card-title text-center">{user.accountName}'s Profile</h2>
        <div className="card-body">
          {!editMode ? (
            <>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>City:</strong> {user.city}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Mobile:</strong> {user.mobile}</p>
              <p><strong>Age:</strong> {user.age} years</p>
              <button
                className="btn btn-primary me-2"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Profile
              </button>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
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
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-success me-2" onClick={handleUpdate}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
