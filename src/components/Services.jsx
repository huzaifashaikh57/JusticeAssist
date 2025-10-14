import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const services = [
  {
    title: 'Get Guidance',
    description: 'Receive expert legal guidance and information on cybercrime cases.',
    icon: 'fas fa-gavel',
    path: '/get-guidance',
    color: '#4285F4', // Google Blue
  },
  {
    title: 'PDF Generator',
    description: 'Generate formatted PDF reports for your case documentation.',
    icon: 'fas fa-file-pdf',
    path: '/report',
    color: '#DB4437', // Google Red
  },
  {
    title: 'AI Assistant',
    description: 'Chat with our AI for instant help and answers to your questions.',
    icon: 'fas fa-robot',
    path: '/chatbot',
    color: '#0F9D58', // Google Green
  },
  {
    title: 'Cyber Awareness',
    description: 'Stay informed with the latest news and articles on cybersecurity.',
    icon: 'fas fa-shield-alt',
    path: '/awareness',
    color: '#F4B400', // Google Yellow
  },
  {
    title: 'Suspect Guess',
    description: 'Utilize our tools to help identify potential suspects.',
    icon: 'fas fa-user-secret',
    path: '/suspect-guess',
    color: '#9C27B0', // Purple
  },
];

const Services = () => {
  return (
    <div className="services-container">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <Link
            to={service.path}
            key={index}
            className="service-card"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = service.color)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
          >
            <div className="card-icon" style={{ backgroundColor: service.color }}>
              <i className={service.icon}></i>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
