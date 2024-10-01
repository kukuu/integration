// server.js
const express = require('express');
const axios = require('axios');
const http = require('http');
const WebSocket = require('ws');

const app = express();//instantiate express
const PORT = process.env.PORT || 5000; //set default port for express

app.use(express.json());

// Simulated external API for electricity reading.Set initial reading to 0
let electricityReading = { value: 10 };

const server = http.createServer(app); //Create server instance from express
const wss = new WebSocket.Server({ server });//Create a Websocket instance

// WebSocket broadcast function. Payload is clients
const broadcastElectricityReading = () => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(electricityReading));
    }
  });
};

// API endpoint to get the latest electricity reading
app.get('/api/electricity-reading', (req, res) => {
  res.json(electricityReading);
});

// API endpoint to update the electricity reading
app.post('/api/update-reading', (req, res) => {
  const { value } = req.body;
  electricityReading = { value };
  broadcastElectricityReading();
  res.json({ success: true });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  ws.send(JSON.stringify(electricityReading));
});