// src/pages/SuspectGuess.jsx
import React, { useState } from "react";
import { FaChevronDown, FaSearch, FaEnvelope, FaGlobe, FaMobileAlt, FaCreditCard, FaLaptopCode } from "react-icons/fa";
import "./SuspectGuess.css";

const SuspectGuess = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [inputData, setInputData] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleAnalyze = () => {
    if (inputData.trim() === "") {
      setAnalysisResult("Please enter some data to analyze.");
      return;
    }
    // Mock analysis based on keywords
    let result = "";
    if (inputData.toLowerCase().includes("ip address")) {
      result = "This looks like an IP address. You can use WHOIS lookup to find registration details.";
    } else if (inputData.toLowerCase().includes("email header")) {
      result = "This appears to be an email header. Look for 'Received' lines, 'X-Originating-IP', and sender details.";
    } else if (inputData.toLowerCase().includes("social media")) {
      result = "This is related to social media. Preserve profile URLs, usernames, and timestamps.";
    } else if (inputData.toLowerCase().includes("transaction id")) {
      result = "This is a transaction ID. Keep records of the platform and associated accounts.";
    } else {
      result = "General analysis: Preserve all digital footprints. Screenshots, timestamps, and communication logs are crucial.";
    }
    setAnalysisResult(result);
  };

  const investigationSteps = [
    {
      title: "IP Addresses",
      icon: <FaGlobe />,
      content: {
        what: "Every device connected to the internet has an IP address. It's like a digital street address.",
        how: "IP addresses can reveal the general geographic location of a device and the Internet Service Provider (ISP) used. While not directly identifying a person, it narrows down the search.",
        tools: "WHOIS lookup, IP geolocation tools.",
        todo: "Record the full IP address, date, and time. Provide it to law enforcement.",
      },
    },
    {
      title: "Email Headers",
      icon: <FaEnvelope />,
      content: {
        what: "Email headers contain a detailed log of the email's journey from sender to recipient, including servers it passed through.",
        how: "Headers can reveal the sender's true email address, originating IP address, and the mail servers used, which can be crucial for tracing.",
        tools: "Online email header analyzers, manual inspection.",
        todo: "Always provide the full, raw email header, not just the visible 'From' address.",
      },
    },
    {
      title: "Social Media Profiles",
      icon: <FaMobileAlt />,
      content: {
        what: "User profiles, posts, and interactions on social media platforms.",
        how: "Usernames, profile pictures, shared content, and connections can provide clues about a suspect's identity, location, and network.",
        tools: "OSINT (Open Source Intelligence) techniques, platform-specific reporting tools.",
        todo: "Take screenshots of profiles, posts, and conversations, noting URLs and timestamps.",
      },
    },
    {
      title: "Transaction IDs & Financial Traces",
      icon: <FaCreditCard />,
      content: {
        what: "Unique identifiers for financial transactions, bank account details, or cryptocurrency wallet addresses.",
        how: "These can be traced through financial institutions or blockchain explorers to identify recipients or associated accounts.",
        tools: "Bank statements, blockchain explorers, financial institution records.",
        todo: "Gather all transaction details, including IDs, amounts, dates, and associated account numbers.",
      },
    },
    {
      title: "Device & File Metadata",
      icon: <FaLaptopCode />,
      content: {
        what: "Hidden information embedded within files (like photos, documents) or device logs.",
        how: "Metadata can reveal details like the device used, software versions, creation dates, and even GPS coordinates (for photos).",
        tools: "Exif data viewers, forensic software.",
        todo: "Preserve original files without modification. Provide them to forensic experts.",
      },
    },
  ];

  return (
    <div className="suspect-guess-page">
      <section className="suspect-hero">
        <h1>Identify Suspect Details</h1>
        <p>Understand the digital footprints left behind and how they can lead to suspect identification in cybercrime cases.</p>
      </section>

      <section className="investigation-guide">
        <h2>How Digital Evidence Helps</h2>
        <div className="accordion-container">
          {investigationSteps.map((step, index) => (
            <div className="accordion-item" key={index}>
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(index)}
              >
                <span className="accordion-icon">{step.icon}</span>
                <span className="accordion-title">{step.title}</span>
                <FaChevronDown className={`accordion-arrow ${openAccordion === index ? 'open' : ''}`} />
              </button>
              {openAccordion === index && (
                <div className="accordion-content">
                  <p><strong>What it is:</strong> {step.content.what}</p>
                  <p><strong>How it helps:</strong> {step.content.how}</p>
                  <p><strong>Common Tools/Methods:</strong> {step.content.tools}</p>
                  <p><strong>What you can do:</strong> {step.content.todo}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="analysis-section">
        <h2>Quick Analysis Tool (Conceptual)</h2>
        <p>Paste any suspicious data (e.g., an email header, IP, URL) below to get conceptual guidance on what information it might contain and how it can be used in an investigation.</p>
        <div className="analysis-input-group">
          <textarea
            placeholder="Paste suspicious data here (e.g., full email header, IP address, social media URL)"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            rows="6"
          ></textarea>
          <button onClick={handleAnalyze}><FaSearch /> Analyze Data</button>
        </div>
        {analysisResult && <p className="analysis-result">{analysisResult}</p>}
      </section>

      <section className="disclaimer-section">
        <h2>Important Disclaimer</h2>
        <p>The information provided on this page is for educational and informational purposes only. It is not intended as legal advice or a substitute for professional investigation. Actual cybercrime investigations require specialized tools, legal authority, and expertise, and should always be conducted by trained law enforcement professionals. JusticeAssist provides guidance to help you understand the process and prepare information for official channels.</p>
      </section>
    </div>
  );
};

export default SuspectGuess;