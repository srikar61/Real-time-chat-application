import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        alert('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, [token]);

  if (!user) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card p-3">
        <h2 className="card-title text-center">{user.accountName}'s Profile</h2>
        <div className="card-body">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>City:</strong> {user.city}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
