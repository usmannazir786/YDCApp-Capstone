import React, { useState } from 'react';

const Polling = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [pollResults, setPollResults] = useState({ option1: 0, option2: 0, option3: 0 });

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleVote = () => {
        if (selectedOption) {
            setPollResults((prevResults) => ({
                ...prevResults,
                [selectedOption]: prevResults[selectedOption] + 1,
            }));
            setSelectedOption('');
        }
    };

    return (
        <div>
            <h2>Food Poll</h2>
            <div>
                <label>
                    <input
                        type="radio"
                        value="option1"
                        checked={selectedOption === 'option1'}
                        onChange={handleOptionChange}
                    />
                    Option 1
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="option2"
                        checked={selectedOption === 'option2'}
                        onChange={handleOptionChange}
                    />
                    Option 2
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="option3"
                        checked={selectedOption === 'option3'}
                        onChange={handleOptionChange}
                    />
                    Option 3
                </label>
            </div>
            <button onClick={handleVote}>Vote</button>
            <h3>Results:</h3>
            <p>Option 1: {pollResults.option1}</p>
            <p>Option 2: {pollResults.option2}</p>
            <p>Option 3: {pollResults.option3}</p>
        </div>
    );
};

export default Polling;