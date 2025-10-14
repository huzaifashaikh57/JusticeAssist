import React from 'react';
import './WhyUs.css';
import { FaShieldAlt, FaUserFriends, FaRocket, FaBrain, FaLanguage, FaBalanceScale } from 'react-icons/fa';

const reasons = [
  {
    icon: <FaShieldAlt />,
    title: 'Trusted Cybercrime Help',
    description: 'Our platform is tailored for secure, verified complaint submission based on national standards.',
    color: '#1E88E5', // Blue
  },
  {
    icon: <FaBrain />,
    title: 'AI-Powered Guidance',
    description: 'Our intelligent assistant helps you understand your cybercrime situation and suggests the right actions instantly.',
    color: '#D81B60', // Pink
  },
  {
    icon: <FaBalanceScale />,
    title: 'Legal & Advocate Support',
    description: 'Get connected with legal experts or advocates for support in severe or complex cybercrime cases.',
    color: '#3949AB', // Indigo
  },
  {
    icon: <FaLanguage />,
    title: 'Multilingual & Inclusive',
    description: 'Available in English, Hindi, and Marathi – JusticeAssist ensures accessibility for everyone.',
    color: '#00897B', // Teal
  },
  {
    icon: <FaUserFriends />,
    title: 'User-Friendly Interface',
    description: 'Simple design, floating labels, animations, and mobile responsiveness enhance your experience.',
    color: '#FB8C00', // Orange
  },
  {
    icon: <FaRocket />,
    title: 'Fast & Efficient Tools',
    description: 'From PDF generation to complaint tracking and suspect guessing — we’ve got tools that save time and effort.',
    color: '#5E35B1', // Deep Purple
  },
];

const WhyUs = () => {
  return (
    <div className="why-us-container">
      <h1 data-aos="fade-down">Why Choose JusticeAssist?</h1>
      <p className="why-us-subheading" data-aos="fade-up" data-aos-delay="100">
        JusticeAssist empowers citizens to report and fight cybercrime with smart technology and human support.
      </p>

      <div className="why-us-grid">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="why-us-card"
            data-aos="fade-up"
            data-aos-delay={100 * (index + 1)}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = reason.color)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
          >
            <div className="card-icon-why-us" style={{ backgroundColor: reason.color }}>
              {reason.icon}
            </div>
            <h2>{reason.title}</h2>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;