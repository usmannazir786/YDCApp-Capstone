// ChatScreen.js
import React from 'react';
import './ChatScreen.css'; // This imports the CSS from ChatScreen.css

function ChatScreen() {
  // Placeholder data for messages
  const messages = Array(5).fill({
    text: 'Message placeholder',
    isUser: false,
    date: 'Placeholder date'
  });

  return (
    <div className="chat-screen-container">
      <div className="chat-screen-header">
        <span className="back-arrow">&#x3c;</span>
        <h1 className="chat-screen-title">Drop-In Chat</h1>
        <span className="chat-screen-options">&#x2699;</span>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user' : 'other'}`}>
            <span className="message-icon">@</span>
            <div className="message-content">
              <span className="message-text">{message.text}</span>
              <span className="message-date">{message.date}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input type="text" placeholder="Type A Message" className="chat-input" />
        <span className="send-message">&#x27A4;</span>
      </div>
    </div>
  );
}

export default ChatScreen;
