const express = require('express');
const axios = require('axios');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

const PORT = 3000;

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Function to make a GET request to a generic API
const getReading = async (readingType) => {
  try {
    const apiEndpoint = getApiEndpointForReading(readingType);
    const response = await axios.get(apiEndpoint);
    return { value: response.data }; // Adjust the property names based on your API response
  } catch (error) {
    console.error(`Error fetching ${readingType} reading:`, error.message);
    return { value: 0 }; // Default value in case of an error
  }
};

// Function to get the API endpoint based on the reading type
const getApiEndpointForReading = (readingType) => {
  const apiEndpoints = {
    weather: '/api/dynamic-reading/weather',
    temperature: '/api/dynamic-reading/temperature',
    pressure: '/api/dynamic-reading/pressure',
    // Add more reading types as needed
  };

  return apiEndpoints[readingType] || 'invalid_reading_type';
};

// API endpoint to get the dynamic reading
app.get('/api/dynamic-reading/:readingType', async (req, res) => {
  const { readingType } = req.params;
  const dynamicReading = await getReading(readingType);
  res.json({ reading: dynamicReading });
});

// API endpoint to update the reading (using POST)
app.post('/api/update-reading', async (req, res) => {
  const { readingType, value } = req.body;
  // Assume the API endpoint for updating readings is '/api/update-reading'
  const apiEndpoint = '/api/update-reading';

  try {
    const response = await axios.post(apiEndpoint, { value });
    res.json({ success: true, message: response.data.message });
  } catch (error) {
    console.error(`Error updating ${readingType} reading:`, error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Server listening on the specified port
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


/*
Now, you can make a request to:
 /api/dynamic-reading/weather, /api/dynamic-reading/temperature,
  or /api/dynamic-reading/pressure, and the server will fetch data
   from the corresponding API endpoint based on the reading type. 
   Adjust the getApiEndpointForReading function
 and API endpoint strings according to your actual reading types and API endpoints.
*/



/*
TWEAK the following code:

let weatherReading = { value: 'Sunny' };
let temperatureReading = { value: 25 };
let pressureReading = { value: 1015 };

// API endpoint to get the Weather reading
app.get('/api/weather', (req, res) => {
  res.json({ reading: weatherReading });
});

// API endpoint to get the Temperature reading
app.get('/api/temperature', (req, res) => {
  res.json({ reading: temperatureReading });
});

// API endpoint to get the Pressure reading
app.get('/api/pressure', (req, res) => {
  res.json({ reading: pressureReading });
});

// API endpoint to update the IoT readings
app.post('/api/update-reading', (req, res) => {
  const { sensorType, value } = req.body;

  // Check the sensor type and update the corresponding reading
  switch (sensorType) {
    case 'weather':
      weatherReading = { value };
      break;
    case 'temperature':
      temperatureReading = { value };
      break;
    case 'pressure':
      pressureReading = { value };
      break;
    default:
      // Handle unknown sensor types
      return res.status(400).json({ success: false, error: 'Unknown sensor type' });
  }

  // Broadcast the updated reading
  broadcastReading();

  res.json({ success: true });
});

*/