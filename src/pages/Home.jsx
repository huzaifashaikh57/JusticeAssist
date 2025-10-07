// src/pages/Home.jsx
import React, { useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lottie from 'lottie-react';
import chatbotAnim from '../assets/chatbot.json';
import suspectAnim from '../assets/detective.json';
import awarenessAnim from '../assets/cybersecurity.json';

{/*import EmergencyHelp from '../pages/EmergencyHelp';*/}

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1 data-aos="fade-down">
          Welcome to <span>JusticeAssist</span>
        </h1>
        <p className="fade-in">
          JusticeAssist – Your Trusted Companion in Navigating and Resolving Cybercrime.
        </p>
        <Link to="/Get-Guidance" className="cta-button" data-aos="zoom-in">
          Start Guidance
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="features">



        {/* AI Chatbot Assistant */}
<div className="feature-card chatbot-feature" data-aos="fade-up">
  <div className="chatbot-content">
    <div className="chatbot-left">
      <Lottie animationData={chatbotAnim} loop={true} style={{ width: '100%', maxWidth: '380px' }} />
    </div>
    <div className="chatbot-right">
      <h2 className="chatbot-heading">AI Chatbot Assistant </h2>
      <p className="chatbot-description">
        Get instant help from our intelligent assistant trained on real cybercrime data and legal frameworks.
        Our AI guides you step by step to:
        <br /><br />
        ➤  Draft cybercrime complaints instantly (PDF-ready)<br />
        ➤  Explain what evidence you need (screenshots, details, etc.)<br />
        ➤  Understand your rights under Indian cyber laws<br />
        ➤  Provide tips to trace suspicious activity or suspects<br />
        ➤  Suggest where to file reports effectively<br /><br />
         Your privacy is protected. No data is stored without consent.
      </p>
      <Link to="/chatbot">
        <button className="cta-button">Try the Chatbot</button>
      </Link>
    </div>
  </div>
</div>

        {/* Suspect Guess Section */}

<div className="feature-card suspect-feature" data-aos="fade-up">
  <div className="suspect-guess">
    <div className="feature-lottie">
      <Lottie animationData={suspectAnim} loop={true} style={{ width: '100%', maxWidth: '380px' }} />
    </div>
    <div className="feature-text">
      <h2>Suspect Guess </h2>
      <p>
        Not sure who might be behind a suspicious message or attack? Our Suspect Guess tool helps analyze digital clues to guide you toward identifying potential suspects — using expert-level AI logic and cyber investigation steps.
        <br /><br />
        ➤ Interpret email headers, IP logs, and device metadata <br />
        ➤ Extract info from screenshots, chats, or files <br />
        ➤ Link usernames, domains, or online aliases <br />
        ➤ Understand what’s admissible as evidence <br />
        ➤ Trace suspicious social media or phone numbers <br /><br />
      </p>
      <p>
         Note: This doesn’t perform live tracking but assists with expert investigation logic for your local cyber police or legal team.
      </p>
      <Link to="/suspect-guess">
        <button className="cta-button">Analyze Clues</button>
      </Link>
    </div>
  </div>
</div>


        {/* Awareness Tools Section */}
<div className="feature-card awareness-feature" data-aos="fade-up">
  <div className="awareness-content">
    <div className="awareness-left">
      <Lottie animationData={awarenessAnim} loop={true} style={{ width: '100%', maxWidth: '380px' }} />
    </div>
    <div className="awareness-right">
      <h2>Awareness Tools </h2>
      <p>
        Stay ahead of cybercriminals with our interactive Awareness Tools designed to educate and empower every internet user.
        Whether you're a student, parent, or professional, these tools help you build cyber resilience through:
        <br /><br />
        ➤   Educational videos on real-life cybercrime cases and how to avoid them<br />
        ➤   Quizzes like "Are You Cyber Safe?" to test your digital safety knowledge<br />
        ➤   Best practices for protecting your online identity and accounts<br />
        ➤  Tips for recognizing phishing links, social engineering, and scam messages<br />
        ➤  Downloadable checklists and guides for reporting and preventing cybercrimes<br /><br />
         Our goal is to make cyber awareness engaging, accessible, and practical for everyone.
      </p>
      <div className="awareness-buttons">
        <Link to="/awareness">
          <button className="cta-button">Explore Tools</button>
        </Link>
        <Link to="/quiz">
          <button className="cta-button cta-secondary">Take a Quiz</button>
        </Link>
      </div>
    </div>
  </div>
</div>





        {/* Emergency Help Section 
        <section id="emergency-help" className="mt-16">
          <EmergencyHelp />
        </section>
*/}

      </section>
    </div>
  );
};

export default Home;
