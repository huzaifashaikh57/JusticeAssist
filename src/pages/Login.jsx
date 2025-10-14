import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting to: http://localhost:5000/auth/login');

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        alert('Login successful!');
        navigate('/');
      } else {
        const data = await response.json();
        alert(data.error || 'Login failed.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in.');
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-left">
          <div className="login-left-overlay"></div>
          <div className="login-left-content">
            <h2>Welcome Back!</h2>
            <p>Log in to access your account and continue your journey with JusticeAssist.</p>
          </div>
        </div>
        <div className="login-right">
          <form className="login-form" action="http://localhost:5000/auth/login" method="POST" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-options">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button type="submit" className="login-btn">Login</button>
            <p className="signup-link">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
