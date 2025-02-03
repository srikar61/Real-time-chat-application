import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div style={styles.container}>
      <motion.div
        className="text-center p-5 shadow-lg rounded"
        style={styles.card}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="display-4 fw-bold"
          style={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Welcome to Quick Chat
        </motion.h1>
        <motion.p
          className="lead mt-3"
          style={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Stay connected with friends and colleagues in real time.
        </motion.p>

        <motion.div
          className="mt-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <i className="fas fa-comments fa-4x text-primary mb-3"></i>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Link to="/chat" className="btn btn-lg mt-3" style={styles.button}>
            <i className="fas fa-paper-plane me-2"></i> Start Chatting
          </Link>
        </motion.div>

        <motion.div
          className="mt-4"
          style={styles.footer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <i className="fas fa-lock"></i> Secure & Private Conversations
        </motion.div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#f8f9fa", // Light gray background for a clean look
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", // Soft shadow effect
    color: "#333",
    width: "90%",
    maxWidth: "500px",
  },
  title: {
    color: "#007bff",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#6c757d",
    fontSize: "18px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "18px",
    background: "#007bff",
    border: "none",
    color: "white",
    transition: "0.3s ease-in-out",
    boxShadow: "0px 4px 10px rgba(0, 123, 255, 0.3)",
    borderRadius: "10px",
    textDecoration: "none",
    display: "inline-block",
  },
  footer: {
    color: "#6c757d",
    fontSize: "16px",
    fontStyle: "italic",
  },
};

export default Home;
