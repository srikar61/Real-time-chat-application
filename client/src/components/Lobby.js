import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Lobby() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data.users);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>Lobby</h2>
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4" key={user.email}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <p>Age: {user.dob}</p>
                <p>City: {user.city}</p>
                <p>Gender: {user.gender}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/chat/${user.username}`)}
                >
                  Chat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lobby;
