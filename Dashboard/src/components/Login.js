import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [role, setRole] = useState("member"); // Default role
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("userRole", role); // Store role in sessionStorage
    onLogin(role); // Call the onLogin prop with the selected role
    // navigate("/Dashboard"); // Redirect to dashboard after login
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
          <option value="guest">Guest</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
