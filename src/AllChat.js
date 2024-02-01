// AllChats.js
import React from 'react';
import './AllChats.css'; // This imports the CSS from AllChats.css

function AllChats() {
  // Placeholder data for chat entries
  const chatPlaceholders = Array(8).fill({ name: 'Placeholder', message: 'Last message...' });

  return (
    <div className="all-chats-container">
      <div className="all-chats-header">
        <span className="back-arrow">&#x3c;</span>
        <h1 className="all-chats-title">Chats</h1>
        <span className="add-chat">&#x271A;</span>
      </div>
      <ul className="chat-list">
        {chatPlaceholders.map((chat, index) => (
          <li key={index} className="chat-item">
            <span className="chat-icon">@</span>
            <div className="chat-info">
              <span className="chat-name">{chat.name}</span>
              <span className="chat-last-message">{chat.message}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllChats;
