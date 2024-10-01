import logo from './logo.svg';
import './App.css';
// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [electricityReading, setElectricityReading] = useState(null);

  useEffect(() => {
   //Create an instance of WebSocket
    const socket = new WebSocket('ws://localhost:5000');
//Add event listener to the broadcast to listen
    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      setElectricityReading(data);
    });

    return () => {
      socket.close();
    };
  }, []);//The empty array at the end of USeEffect ensures there is no side effect and that it runs once. 

  const updateReading = async () => {
    const newValue = prompt('Enter new reading value:');
    if (newValue !== null) {
      await fetch('/api/update-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: parseFloat(newValue) }),
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Electricity Metre Digital Twin</h1>
        {electricityReading && (
          <p>Current Reading: {electricityReading.value} kWh {String.fromCodePoint(0x1F604)}</p>
        )}
        <button onClick={updateReading}>Update Reading</button>
      </header>
    </div>
  );
}

export default App;
