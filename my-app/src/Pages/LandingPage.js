import React, { useState } from 'react';
import '../Styles/LandingPage.css';
import CorrectionImage from '../Resources/PencilCorrectingPaper.png';

const LandingPage = () => {
  const [answer, setAnswer] = useState("");
  const [marks, setMarks] = useState(null);
  const question = "A clothing shop uses a barcode reader at the checkout The checkout is linked to a stock control system. The system monitors stock levels and automatically keeps them above the minimum level. Explain how the stock control system automatically keeps the stock level above minimum level";
  const markingSchemeAnswer = "1-Stock control system has a database of stock 2-Each product has a (unique) barcode 3-Barcode is scanned, and product looked up in database 4- Stock levels for product are reduced by 1 5- Stock is checked against minimum level 6-If stock at/below minimum level an order is placed 7-When stock is re-ordered flag is reset";
  const maxMark = 4;

  const APIBody = {
    "messages": [
      {"role": "system", "content": `You are a professional IGCSE examiner that can mark questions when you are given the following 
      1- A question
      2- Number of maximum marks of  the quesiton
      3- detailed marking scheme for the question and every point in the marking scheme is appointed with one mark
      4- a student's answer 
      and you should count how many points the student mentioned in their answer and appoint 
      
      the mark should be an integer value between 0 and the number of maximum marks given in the paramters above.
      
      reply with a json object that looks like this
      {
      marksAwarded:3
      pointsGottenCorrectly: 1-  "point from marking scheme"
      2-  "point from marking scheme"
      3-  "point from marking scheme"
      
      pointsNotWritten: 1-  "point from marking scheme"
      2-  "point from marking scheme"
      3-  "point from marking scheme"
      }`},
      {"role": "system", "content": "1- A question"},
      {"role": "system", "content": `2- Number of maximum marks of the question: ${maxMark}`},
      {"role": "system", "content": `3- Detailed marking scheme for the question:\n${markingSchemeAnswer}`},
      {"role": "system", "content": `4- A student's answer: ${answer}`},
      {"role": "user", "content": `1- Question: ${question}`},
      {"role": "user", "content": `2- Maximum marks: ${maxMark}`},
      {"role": "user", "content": `3- Marking scheme: ${markingSchemeAnswer}`},
      {"role": "user", "content": `4- Student answer: ${answer}`},
    ],
    "model": "gpt-3.5-turbo"
  };

  async function callOpenAIAPI() {
    console.log("Calling the OpenAI API");
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.REACT_APP_OPENAI_API,
        "OpenAI-Beta": "assistants=v1"
      },
      body: JSON.stringify(APIBody)
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data.choices[0].message.content);
        setMarks(JSON.parse(JSON.stringify(data.choices[0].message.content)));
        console.log(JSON.parse(JSON.stringify(data.choices[0].message.content)).marksAwarded);
      });
  }

  console.log(answer);

  return (
    <div className="landing-page">
      <img src={CorrectionImage} alt="" className="CorrectionImage" />
      <h1>Answer the Question [4MAKRS]</h1>
      <p className='Question'>A clothing shop uses a barcode reader at the checkout <br/><br/> The checkout is linked to a stock control system. The system monitors stock levels and automatically keeps them above the minimum level.<br/><br/>Explain how the stock control system automatically keeps the stock level above minimum level</p>
      <input
        type="text"
        placeholder="Type your answer here"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className='Answer'
      />
      <button onClick={callOpenAIAPI}>Submit Answer</button>

      {marks !== null && (
        <div className="result">
          <p>Your marks: {marks}</p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
