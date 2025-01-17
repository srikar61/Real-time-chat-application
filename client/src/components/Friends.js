import React, { useState, useEffect } from 'react';

function Friends() {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Fetch all available users (mock data for simplicity)
    const availableUsers = [
      { id: 1, username: 'Alice', age: 23, location: 'London' },
      { id: 2, username: 'Bob', age: 30, location: 'Paris' },
      { id: 3, username: 'Charlie', age: 27, location: 'Berlin' },
    ];
    setUsers(availableUsers);
  }, []);

  const addFriend = (user) => {
    setFriends((prevFriends) => [...prevFriends, user]);
  };

  return (
    <div className="container mt-5">
      <h2>Find Friends</h2>
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4" key={user.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">Age: {user.age}</p>
                <p className="card-text">Location: {user.location}</p>
                <button className="btn btn-primary" onClick={() => addFriend(user)}>
                  Add Friend
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3>Your Friends</h3>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Friends;
