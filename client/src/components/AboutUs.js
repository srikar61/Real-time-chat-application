import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => (
  <div className="container mt-5">
    <h2>About Real-time Chat App</h2>
    <p>This app allows users to communicate with others in real-time. Our platform enables seamless text-based conversations, group chats, file sharing, and notifications. It's perfect for businesses, communities, and personal use!</p>
    
    <h4>Features:</h4>
    <ul>
      <li>Instant Messaging</li>
      <li>Group Chats</li>
      <li>Real-time Notifications</li>
      <li>File Sharing</li>
      <li>Responsive Design for Mobile and Desktop</li>
    </ul>

    <h4>Why choose our app?</h4>
    <p>Our app is built with performance and user experience in mind. We use WebSockets for real-time communication and a scalable backend, ensuring that your messages are delivered instantly and securely.</p>

    <Link to="/home" className="btn btn-link">Back to Home</Link>
  </div>
);

export default AboutUs;
