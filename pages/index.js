import { useState } from 'react';

import axios from 'axios';
const kk = `name: time-sync-demo
description:
tags:
initialize:
  plugins:
    'time-sync':
      method: TimeSync
      path: "builtin"
      global-config: 
        start-time: '2023-12-12T00:00:00.000Z'
        end-time: '2023-12-12T00:01:00.000Z'
        interval: 5
        allow-padding: true
tree:
  children:
    child:
      pipeline:
        - time-sync
      config:
      inputs:
        - timestamp: '2023-12-12T00:00:00.000Z'
          duration: 1
          energy-cpu: 0.001
        - timestamp: '2023-12-12T00:00:01.000Z'
          duration: 5
          energy-cpu: 0.001
        - timestamp: '2023-12-12T00:00:06.000Z'
          duration: 7
          energy-cpu: 0.001
        - timestamp: '2023-12-12T00:00:13.000Z'
          duration: 30
          energy-cpu: 0.001`
export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
    // Function to handle row click
    const handleRowClick = (row) => {
      setInputValue(row.content);
    };

  const handleRunClick = async () => {
    console.log("hsidsid")


    try {
      // Make a GET request to the API endpoint
      const response = await axios.post("https://if-playground.vercel.app/api/hello/", {
        input: inputValue
      });    

      const cleanedOutputValue = response.data.substring(response.data.indexOf('{'));
console.log(cleanedOutputValue)
      const formattedOutputValue = JSON.stringify(JSON.parse(cleanedOutputValue), null, 2);

      // Set the output value to the response data
      setOutputValue(formattedOutputValue);
    } catch (error) {
      console.error('Error fetching data:', error);
      setOutputValue('Error fetching data. Please check your network connection.');
    }
 
  };
  const rows = [
   {"title": "time-sync-demo", "content": kk},
   {"title": "Row 2 content", "content": ""}
  ];
  return (
    <div className="container">
      <h1>IF Playground</h1>
      <div className="input-container">
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your input here"
        />
        <div className="row-list">
          {rows.map((row, index) => (
            <div key={index} className="row" onClick={() => handleRowClick(row)}>
              {row.title}
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleRunClick}>Run</button>
      <div className="output-container">
        <textarea
          value={outputValue}
          readOnly
          placeholder="Output will appear here"
        />
      </div>
      <style jsx>{`
        .container {
          margin: 50px auto;
          padding: 20px;
          max-width: 600px;
          text-align: center;
          border: 2px solid #ccc;
          border-radius: 10px;
        }
        .input-container {
          margin-bottom: 20px;
        }
        textarea {
          width: 100%;
          height: 200px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          resize: none;
        }
        button {
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #0056b3;
        }
        .output-container {
          margin-top: 20px;
        }
        .row-list {
          margin-top: 10px;
        }
        .row {
          cursor: pointer;
          padding: 5px;
          background-color: #f0f0f0;
          border-radius: 5px;
          margin-bottom: 5px;
        }
        .row:hover {
          background-color: #e0e0e0;
        }
      `}</style>
    </div>
  );
}