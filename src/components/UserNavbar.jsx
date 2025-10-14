import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import './UserNavbar.css';

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // ✅ all service routes
  const servicePaths = [
    '/get-guidance',
    '/report',
    '/chatbot',
    '/awareness',
    '/suspect-guess',
  ];

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // ✅ fixed getLinkClass to check service paths
  const getLinkClass = (path) => {
    if (path === 'services') {
      return servicePaths.includes(location.pathname)
        ? 'nav-link active'
        : 'nav-link';
    }
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <RouterLink to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          Justice<span>Assist</span>
        </RouterLink>
      </div>

      <div className={`navbar-center ${isOpen ? 'open' : ''}`}>
        <div className="navbar-links">
          <a href="#home" onClick={(e) => handleClick(e, 'home')} className="nav-link">
            Home
          </a>

          {isHomePage ? (
            <a href="#services" onClick={(e) => handleClick(e, 'services')} className="nav-link">
              Services
            </a>
          ) : (
            <RouterLink to="/#services" className="nav-link">
              Services
            </RouterLink>
          )}

          <RouterLink to="/user-dashboard" className={getLinkClass('/user-dashboard')}>
            Dashboard
          </RouterLink>

          <RouterLink to="/#why-us" className="nav-link">
            Why Us
          </RouterLink>
          <RouterLink to="/#about-us" className="nav-link">
            About Us
          </RouterLink>
          <RouterLink to="/#contact-us" className="nav-link">
            Contact
          </RouterLink>
        </div>
      </div>

      <div className="navbar-right">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? 'rotate1' : ''}`}></span>
          <span className={`bar ${isOpen ? 'fade' : ''}`}></span>
          <span className={`bar ${isOpen ? 'rotate2' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
