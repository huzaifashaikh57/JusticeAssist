// src/components/ChatbotPopup.jsx
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Lottie from "lottie-react";
import chatbotAnim from "../assets/ChatbotHelp.json";
import "./ChatbotPopup.css";
import axios from "axios";


const ChatbotPopup = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello 👋 I’m your JusticeAssist chatbot. How can I help you?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
  
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    const userMessage = input;
    setInput("");
  
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/ai/get-guidance",
        { query: userMessage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 JWT stored after login
          },
        }
      );
  
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: res.data.guidance || "No response from AI.",
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Authentication error or server issue." },
      ]);
    }
  };
  
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <button className="chatbot-button" onClick={() => setOpen(!open)}>
        <Lottie animationData={chatbotAnim} loop={true} className="chatbot-lottie" />
      </button>

      {/* Popup Chat Window */}
      {open && (
        <div className="chatbot-popup">
          {/* Header */}
          <div className="chatbot-header">
            <h3>JusticeAssist Chatbot</h3>
            <button onClick={() => setOpen(false)}>
              <IoMdClose size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.from === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="chatbot-input-container">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="chatbot-input"
            />
            <button className="chatbot-send-btn" onClick={handleSend}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPopup;
