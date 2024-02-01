// HomePage.js
import React from 'react';
import './HomePage.css'; // This imports the CSS from HomePage.css

function HomePage() {
  return (
    <div className="container">
      <h1 className="title">Youth Drop-In Centre Chats</h1>
      <button className="menu-button">Chat</button>
      <button className="menu-button">Vote</button>
      <button className="menu-button">Contacts</button>
      <button className="menu-button">Report</button>
      <button className="menu-button">Settings</button>
    </div>
  );
}

export default HomePage;
