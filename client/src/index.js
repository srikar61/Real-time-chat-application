import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/styles.css'; // If you have a global CSS file
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
