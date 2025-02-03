.
# Real-Time Chat Application (MERN Stack)

## Overview

This is a real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to sign up, log in, create profiles, and engage in real-time messaging with other users. The application is designed with a clean user interface, and it features seamless communication between users through WebSockets (Socket.io).

## Features

- **User Authentication**: Sign up, login, and logout functionality.
- **Profile Management**: Users can view and update their profiles.
- **Real-time Chat**: Send and receive messages instantly using WebSockets.
- **Responsive UI**: Optimized for mobile and desktop devices.
- **Logout**: Secure logout feature.
- **Home Page**: Overview of available features and navigation to other sections.

## Technologies Used

- **MongoDB**: NoSQL database to store user and message data.
- **Express.js**: Backend framework for routing and server-side logic.
- **React.js**: Frontend library for building the user interface.
- **Node.js**: JavaScript runtime for the server-side.
- **Socket.io**: Real-time bidirectional communication between client and server.
- **JWT (JSON Web Token)**: For secure user authentication.

## Application Screenshots

### 1. Login / Sign Up
![Image](https://github.com/user-attachments/assets/3f5db40b-3541-4f82-98c1-16f53920ea43)
![Image](https://github.com/user-attachments/assets/c093f28e-d510-4bbb-8f2e-13159662c0d8)

### 2. Profile
![Image](https://github.com/user-attachments/assets/6b79330a-9dd0-48b4-a243-41c0ae7f1820)

### 3. Chat
![Image](https://github.com/user-attachments/assets/e0ac45a7-9d39-48b4-b14a-951c37ed0c35)

### 4. About
![Image](https://github.com/user-attachments/assets/6c9bbfdf-9490-4249-9435-1555c55c79e1)

### 5. Home
![Image](https://github.com/user-attachments/assets/cad037d8-f714-4570-9854-c4b0377b5a4f)

### 6. Logout
![Image](https://github.com/user-attachments/assets/9a0532a6-bc79-4dbc-b8e7-0103a998eac6)

## Setup Instructions

### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/realtime-chat-app.git
cd realtime-chat-app
2. Backend Setup (Node.js + Express)
Navigate to the backend directory:

bash
Copy
Edit
cd backend
Install backend dependencies:

bash
Copy
Edit
npm install
Create a .env file in the root of the backend directory and add the following environment variables:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
Replace your_mongodb_connection_string with your MongoDB connection URI.
Replace your_jwt_secret with a secret key for JWT.
Start the backend server:

bash
Copy
Edit
npm start
The backend should now be running on http://localhost:5000.

3. Frontend Setup (React.js)
Navigate to the frontend directory:

bash
Copy
Edit
cd frontend
Install frontend dependencies:

bash
Copy
Edit
npm install
Start the frontend server:

bash
Copy
Edit
npm start
The frontend should now be running on http://localhost:3000.

How to Use
Sign Up: Create a new account by providing a username, email, and password.
Login: Use your credentials to log into your account.
Profile: After logging in, you can view and update your profile information.
Chat: Start chatting with other users in real time. Select a user from the list to begin a conversation.
Logout: Securely log out from the application.
Contributions
Contributions are welcome! Please feel free to fork the repository, open an issue, or submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
Thanks to the MERN stack for providing an amazing framework for full-stack development.
Special thanks to the Socket.io library for enabling real-time communication.
