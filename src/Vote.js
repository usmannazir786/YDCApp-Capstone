// Vote.js
import React, { useState } from 'react';
import './Vote.css'; // This imports the CSS from Vote.css

function Vote() {
  // Placeholder state structure for votes
  const [votes, setVotes] = useState({
    option1: null, // 'yes', 'no', or null
    option2: null, // 'yes', 'no', or null
  });

  // Function to handle vote changes
  const handleVote = (item, vote) => {
    setVotes({ ...votes, [item]: vote });
  };

  // Function to handle confirm
  const handleConfirm = () => {
    console.log(votes);
    // Here you can handle the confirmation, like sending the data to a backend
  };

  return (
    <div className="vote-container">
      <div className="vote-header">
        <span className="back-arrow">&#x3c;</span>
        <h1 className="vote-title">Voting</h1>
      </div>
      
      <div className="vote-item">
        <h2>Option 1 Placeholder</h2>
        <button
          className={`vote-button ${votes.option1 === 'yes' ? 'selected' : ''}`}
          onClick={() => handleVote('option1', 'yes')}
        >
          YES
        </button>
        <button
          className={`vote-button ${votes.option1 === 'no' ? 'selected' : ''}`}
          onClick={() => handleVote('option1', 'no')}
        >
          NO
        </button>
      </div>

      <div className="vote-item">
        <h2>Option 2 Placeholder</h2>
        <button
          className={`vote-button ${votes.option2 === 'yes' ? 'selected' : ''}`}
          onClick={() => handleVote('option2', 'yes')}
        >
          YES
        </button>
        <button
          className={`vote-button ${votes.option2 === 'no' ? 'selected' : ''}`}
          onClick={() => handleVote('option2', 'no')}
        >
          NO
        </button>
      </div>

      <button className="confirm-button" onClick={handleConfirm}>
        Confirm
      </button>
    </div>
  );
}

export default Vote;
