import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import Chat from './components/Chat';

function App() {
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Welcome onSetUsername={setUsername} onSetRoomCode={setRoomCode} />}
        />
        <Route
          path="/chat"
          element={<Chat username={username} roomCode={roomCode} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
