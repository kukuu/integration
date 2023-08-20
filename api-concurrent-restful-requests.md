# Making RESTful concurrent AXIOS API requests

In this example, we use Axios to send GET requests to multiple API endpoints concurrently. The Promise.all() method takes an array of promises (in this case, Axios request promises) and waits for all of them to be resolved. It returns an array of responses corresponding to each promise.
To make concurrent Axios API requests in JavaScript, you can use Promise.all() to handle multiple asynchronous calls simultaneously. Here's an example of how you can achieve this:

```
const axios = require('axios');

// Function to make concurrent API requests using Axios
async function makeConcurrentRequests() {
  const requestUrls = [
    'https://api.example.com/resource1',
    'https://api.example.com/resource2',
    'https://api.example.com/resource3'
    // Add more API endpoints as needed
  ];

  try {
    // Create an array of Axios request promises
    const requestPromises = requestUrls.map(url => axios.get(url));

    // Execute all requests concurrently using Promise.all()
    const responses = await Promise.all(requestPromises);

    // Process the responses
    responses.forEach(response => {
      console.log('Status:', response.status);
      console.log('Data:', response.data);
      console.log('-----------------------');
    });

    // Add further processing as needed

  } catch (errors) {
    console.error('Error:', errors.message);
  }
}

// Call the function to make concurrent requests
makeConcurrentRequests();

```
##  Further Example:

- https://github.com/kukuu/Microservice-NodeJS/blob/master/ggoem/src/index.js
