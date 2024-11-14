import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'admin') {
      setError('');
      navigate('/app', { state: { role: 'admin' } });
    } else if (username === 'guest' && password === 'guest') {
      setError('');
      navigate('/app', { state: { role: 'guest' } });
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  const handleCancel = () => {
    window.location.href = '/';
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Login</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};