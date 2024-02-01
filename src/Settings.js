// Settings.js
import React, { useState } from 'react';
import './Settings.css'; // This imports the CSS from Settings.css

function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Here you can also update the application's theme
  };

  // Placeholder functions for navigation/interaction
  const handleChangeTextSize = () => {
    console.log('Text size change triggered');
    // Implement text size change logic
  };

  const handleChangeTextFont = () => {
    console.log('Text font change triggered');
    // Implement text font change logic
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <span className="back-arrow">&#x3c;</span>
        <h1 className="settings-title">Settings</h1>
      </div>

      <div className="settings-section">
        <h2>Display Settings</h2>
        <div className="settings-option">
          <span>Dark Mode</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleToggleDarkMode}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="settings-option" onClick={handleChangeTextSize}>
          <span>Text Size</span>
          <span className="forward-arrow">&#x2192;</span>
        </div>
      </div>

      <div className="settings-section">
        <h2>Preferences Settings</h2>
        <div className="settings-option" onClick={handleChangeTextFont}>
          <span>Text Font</span>
          <span className="forward-arrow">&#x2192;</span>
        </div>
      </div>
    </div>
  );
}

export default Settings;
