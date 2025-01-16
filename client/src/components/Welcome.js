import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animations

function Welcome({ onSetUsername, onSetRoomCode }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [isNewRoom, setIsNewRoom] = useState(false);
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomCode = uuidv4(); // Generate unique room code
    setRoom(newRoomCode);
    onSetRoomCode(newRoomCode);
    onSetUsername(username.trim());
    navigate(`/chat?roomCode=${newRoomCode}&username=${username.trim()}`);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (username.trim() && room.trim()) {
      onSetUsername(username.trim());
      onSetRoomCode(room.trim());
      navigate(`/chat?roomCode=${room.trim()}&username=${username.trim()}`);
    }
  };

  return (
    <motion.div
      className="container d-flex flex-column align-items-center justify-content-center vh-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Real-Time Chat</h1>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>
        {isNewRoom ? (
          <div className="d-grid gap-2">
            <button className="btn btn-primary" onClick={handleCreateRoom}>
              Create Room and Join
            </button>
          </div>
        ) : (
          <form onSubmit={handleJoinRoom} className="d-grid gap-2">
            <input
              type="text"
              placeholder="Enter room code"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-success">
              Join Room
            </button>
          </form>
        )}
        <div className="mt-3 text-center">
          <button
            className="btn btn-link"
            onClick={() => setIsNewRoom((prev) => !prev)}
          >
            {isNewRoom ? 'Join an Existing Room' : 'Create a New Room'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Welcome;
