import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName: name, email, password }),
      });

      if (response.ok) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        const data = await response.json();
        alert(data.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('An error occurred while registering.');
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-left">
          <div className="login-left-content">
            <h2>Create an Account</h2>
            <p>Join JusticeAssist and be a part of the community.</p>
          </div>
        </div>
        <div className="login-right">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">Sign Up</button>
            <p className="signup-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;