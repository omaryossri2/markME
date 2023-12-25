// src/LandingPage.js
import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/LandingPage.css';
import CorrectionImage from '../Resources/PencilCorrectingPaper.png';

const LandingPage = () => {
  const [answer, setAnswer] = useState('');
  const [marks, setMarks] = useState(null);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Simulating a backend with JSONPlaceholder
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        answer,
      });

      // Assuming the backend responds with the marks
      setMarks(response.data.id);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div className="landing-page">
      <img src= {CorrectionImage}  alt = "" className='CorrectionImage' />
      <h1>Answer the Question [4MAKRS]</h1>
      <p className='Question'>A clothing shop uses a barcode reader at the checkout <br/><br/> The checkout is linked to a stock control system. The system monitors stock levels and automatically keeps them above the minimum level.<br/><br/>Explain how the stock control system automatically keeps the stock level above minimum level</p>
      <input
        type="text"
        placeholder="Type your answer here"
        value={answer}
        onChange={handleAnswerChange}
        className='Answer'
      />
      <button onClick={handleSubmit}>Submit Answer</button>

      {marks !== null && (
        <div className="result">
          <p>Your marks: {marks}</p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
