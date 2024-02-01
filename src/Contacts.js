// Contacts.js
import React from 'react';
import './Contacts.css'; // This imports the CSS from Contacts.css

function Contacts() {
  // Placeholder data for contact names
  const contacts = [
    'Placeholder 1',
    'Placeholder 2',
    'Placeholder 3',
    'Placeholder 4',
    'Placeholder 5',
    'Placeholder 6',
  ];

  return (
    <div className="contacts-container">
      <div className="contacts-header">
        <span className="back-arrow">&#x3c;</span>
        <h1 className="contacts-title">Contacts</h1>
      </div>
      <ul className="contacts-list">
        {contacts.map((contact, index) => (
          <li key={index} className="contact-item">
            <span className="contact-icon">@</span>
            <span className="contact-name">{contact}</span>
            <span className="contact-action">&#x25BA;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
