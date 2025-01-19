import React from 'react';

const UserList = ({ users, selectUser }) => (
  <div className="user-list">
    <h4>Users</h4>
    <ul>
      {users.map((user) => (
        <li key={user.id} onClick={() => selectUser(user)}>
          {user.username}
        </li>
      ))}
    </ul>
  </div>
);

export default UserList;
