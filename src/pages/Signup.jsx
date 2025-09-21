// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import './Login.css'; // Reusing login styles

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Handle signup logic here
    alert('Account created successfully! Please login.');
    navigate('/login');
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-form-container-single" style={{ maxWidth: '500px' }}>
        <button onClick={() => navigate('/login')} className="back-btn">
          <FaArrowLeft />
        </button>
        <h2 style={{ marginBottom: '2rem' }}>Create an Account</h2>

        <form onSubmit={handleSignup} className="login-form-element">
          <div className="input-group">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn" style={{ marginTop: '1rem' }}>Sign Up</button>
        </form>

        <div className="signup-link" style={{ marginTop: '2rem' }}>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
