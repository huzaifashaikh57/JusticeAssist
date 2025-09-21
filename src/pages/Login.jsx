// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserShield, FaUser, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', role);

    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-form-container-single">
        

        <h2>Login to JusticeAssist</h2>

        <div className="role-switcher">
          <button
            className={`role-btn ${role === 'user' ? 'active' : ''}`}
            onClick={() => setRole('user')}
          >
            <FaUser /> User
          </button>
          <button
            className={`role-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            <FaUserShield /> Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="login-form-element">
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
            <div className="password-input">
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <span onClick={() => setShowPass(!showPass)} className="password-toggle">
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="form-options">
            <div className="toggle-switch-container">
              <input type="checkbox" id="remember-me" className="toggle-switch-checkbox" />
              <label htmlFor="remember-me" className="toggle-switch-label"></label>
              <span>Remember Me</span>
            </div>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="divider">OR</div>

        <div className="social-login">
          <button className="social-btn google-btn"><FaGoogle /> Sign in with Google</button>
          
        </div>

        <div className="signup-link">
          <p>New here? <Link to="/signup">Create an Account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
