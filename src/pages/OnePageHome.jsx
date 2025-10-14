import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './Home';
import WhyUs from './WhyUs';
import Services from '../components/Services'; // Import the new component
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import './OnePageHome.css';

const OnePageHome = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="one-page-home-container">
      <div id="home" className="element">
        <Home />
      </div>
      <div id="services" className="element"> {/* Add services section */}
        <Services />
      </div>
      <div id="why-us" className="element">
        <WhyUs />
      </div>
      <div id="about-us" className="element">
        <AboutUs />
      </div>
      <div id="contact-us" className="element">
        <ContactUs />
      </div>
    </div>
  );
};

export default OnePageHome;
