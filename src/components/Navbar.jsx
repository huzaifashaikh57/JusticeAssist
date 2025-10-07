// src/components/UserNavbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UserNavbar.css';

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent nav from closing when dropdown is toggled
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        Justice<span>Assist</span>
      </Link>

      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>

        <div
          className={`dropdown ${dropdownOpen ? 'open' : ''}`}
          onClick={toggleDropdown}
        >
          <span className="dropdown-toggle">
            Services <span className="dropdown-arrow">&#9662;</span>
          </span>
          <div className="dropdown-content">
          <Link to="/get-guidance">Get Guidance</Link>
          
            
            <Link to="/chatbot" onClick={closeMenu}>AI Assistant</Link>
            <Link to="/awareness" onClick={closeMenu}>Cyber Awareness</Link>
            <Link to="/suspect-guess" onClick={closeMenu}>Suspect Guess</Link>
          </div>
        </div>

        <Link to="/why-us" onClick={closeMenu}>Why Us</Link>
        <Link to="/about-us" onClick={closeMenu}>About Us</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span className={`bar ${isOpen ? 'rotate1' : ''}`}></span>
        <span className={`bar ${isOpen ? 'fade' : ''}`}></span>
        <span className={`bar ${isOpen ? 'rotate2' : ''}`}></span>
      </div>
    </nav>
  );
};

export default UserNavbar;
