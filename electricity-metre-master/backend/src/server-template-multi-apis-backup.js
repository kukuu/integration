const axios = require('axios');

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

// API endpoint to get the dynamic reading
app.get('/api/dynamic-reading/:readingType', async (req, res) => {
  const { readingType } = req.params;
  const dynamicReading = await getReading(readingType);
  res.json({ reading: dynamicReading });
});

// Function to get the API endpoint based on the reading type
const getApiEndpointForReading = (readingType) => {
  const apiEndpoints = {
    weather: 'your_weather_api_endpoint',
    temperature: 'your_temperature_api_endpoint',
    pressure: 'your_pressure_api_endpoint',
    // Add more reading types as needed
  };

  return apiEndpoints[readingType] || 'invalid_reading_type';
};


/*
Now, you can make a request to:
 /api/dynamic-reading/weather, /api/dynamic-reading/temperature,
  or /api/dynamic-reading/pressure, and the server will fetch data
   from the corresponding API endpoint based on the reading type. 
   Adjust the getApiEndpointForReading function
 and API endpoint strings accor:ding to your actual reading types and API endpoints.
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