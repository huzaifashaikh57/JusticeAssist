import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AIAssistant.css';

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages([...messages, { text: userText, sender: 'user' }]);
    setInput('');

    try {
      const res = await fetch('http://127.0.0.1:5000/ai/get-guidance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userText }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed with ${res.status}`);
      }
      const data = await res.json();
      setMessages(prev => [...prev, { text: data.guidance || 'No response from AI.', sender: 'ai' }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { text: '⚠️ Authentication error or server issue.', sender: 'ai' }]);
    }
  };

  return (
    <div className="ai-assistant-container">
      <div className="chat-header">
        AI Assistant
      </div>
      <div className="chat-window">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`message ${msg.sender}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default AIAssistant;
