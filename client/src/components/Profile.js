import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Profile() {
  document.title = "Profile";
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        setMessage("⚠️ Failed to fetch profile.");
      }
    };
    fetchProfile();
  }, [token]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:5000/api/users/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(formData);
      setEditMode(false);
      setMessage("✅ Profile updated successfully!");
    } catch (error) {
      setMessage("⚠️ Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("authToken");
      navigate("/signup");
    } catch (error) {
      setMessage("⚠️ Failed to delete profile.");
    }
  };

  if (!user) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div style={styles.container}>
      <motion.div 
        className="card shadow-lg p-4" 
        style={styles.card}
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <h2 className="card-title text-center mb-4" style={styles.title}>
          {user.accountName}'s Profile
        </h2>

        {message && (
          <motion.p 
            className="text-center text-info" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.p>
        )}

        <div className="card-body">
          {!editMode ? (
            <>
              <ProfileField label="Username" value={user.username} />
              <ProfileField label="Email" value={user.email} />
              <ProfileField label="City" value={user.city} />
              <ProfileField label="Gender" value={user.gender} />
              <ProfileField label="Mobile" value={user.mobile} />
              <ProfileField label="Age" value={`${user.age} years`} />

              <div className="text-center mt-4">
                <motion.button 
                  className="btn btn-primary me-2" 
                  style={styles.button}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </motion.button>
                <motion.button 
                  className="btn btn-danger"
                  style={styles.deleteButton}
                  whileHover={{ scale: 1.1 }}
                  onClick={handleDelete}
                >
                  Delete Profile
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <EditableField label="Username" name="username" value={formData.username} onChange={handleChange} />
              <EditableField label="Email" name="email" value={formData.email} type="email" onChange={handleChange} />
              <EditableField label="Date of Birth" name="dob" value={formData.dob} type="date" onChange={handleChange} />
              <EditableField label="City" name="city" value={formData.city} onChange={handleChange} />
              <EditableField label="Gender" name="gender" value={formData.gender} onChange={handleChange} type="select" />
              <EditableField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} />

              <div className="text-center mt-4">
                <motion.button 
                  className="btn btn-success me-2" 
                  style={styles.button}
                  whileHover={{ scale: 1.1 }}
                  onClick={handleUpdate}
                >
                  Save
                </motion.button>
                <motion.button 
                  className="btn btn-secondary" 
                  style={styles.cancelButton}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </motion.button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

const ProfileField = ({ label, value }) => (
  <div className="mb-3">
    <p>
      <strong>{label}:</strong> {value}
    </p>
  </div>
);

const EditableField = ({ label, name, value, type = "text", onChange }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    {type === "select" ? (
      <select className="form-select" name={name} value={value} onChange={onChange}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    ) : (
      <input type={type} className="form-control" name={name} value={value} onChange={onChange} />
    )}
  </div>
);

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg,rgb(255, 255, 255),rgb(255, 255, 255))",
  },
  card: {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  },
  title: {
    color: "#007bff",
    fontWeight: "bold",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    transition: "0.3s ease-in-out",
  },
  deleteButton: {
    background: "#dc3545",
    borderColor: "#dc3545",
    padding: "10px 20px",
    fontSize: "16px",
    transition: "0.3s ease-in-out",
  },
  cancelButton: {
    background: "#6c757d",
    borderColor: "#6c757d",
    padding: "10px 20px",
    fontSize: "16px",
    transition: "0.3s ease-in-out",
  },
};

export default Profile;
