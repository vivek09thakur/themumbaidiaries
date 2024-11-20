import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Styles/SignUp.css";

const LogIn = () => {
  const api = import.meta.env.VITE_API_URI;
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${api}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await response.json();
        if (data.status === 'success') {
            localStorage.setItem('sessionToken', data.sessionToken);
            localStorage.setItem('user', JSON.stringify({username: username}));
            window.location.href = '/feed';
        }
    } catch (error) {
        console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login_vector"></div>
      <div className="login-box">
        <h2>Welcome Back!</h2>
        <p>Share your Mumbai stories with the world</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;