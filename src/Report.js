// Report.js
import React, { useState } from 'react';
import './Report.css'; // This imports the CSS from Report.css

function Report() {
  const [report, setReport] = useState({
    name: '',
    date: '',
    description: '',
  });

  // Update the state for each input field
  const handleChange = (event) => {
    const { name, value } = event.target;
    setReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(report);
    // Here you would typically send the report to a server
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <span className="back-arrow">&#x3c;</span>
        <h1 className="report-title">Report</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name"
          value={report.name}
          onChange={handleChange}
        />

        <label htmlFor="date">Date of report:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={report.date}
          onChange={handleChange}
        />

        <label htmlFor="description">What Happened?</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter What Happened"
          value={report.description}
          onChange={handleChange}
        />

        <button type="submit" className="submit-button">
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default Report;
