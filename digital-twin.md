# Digital Twin 

Digital Twin and Digital Thread are two interrelated but distinct concepts used in the context of digital transformation, primarily in manufacturing, product lifecycle management, and industrial IoT.

1. Digital Twin
A Digital Twin is a virtual representation of a physical product, system, or process. It acts as a digital replica that is continuously updated with real-time data from the physical counterpart, allowing for monitoring, simulation, and analysis.

_Purpose_: Digital Twins are used to replicate physical entities and simulate their behavior under various scenarios. This helps in predictive maintenance, testing new design configurations, optimizing performance, and identifying potential failures before they happen.


_Components_: Digital Twins can be complex, integrating sensors, historical data, real-time monitoring, and artificial intelligence to provide insights on the physical system.

_Use Cases_: Digital Twins are widely used in aerospace (e.g., monitoring airplane engines), automotive (vehicle design and testing), and smart cities (optimizing energy usage and urban planning).
Example: A car manufacturer uses a Digital Twin to simulate the performance of an engine, factoring in real-time data from sensors in the physical engine. This helps engineers identify issues early and test modifications virtually before making changes to the actual engine.

2. Digital Thread
A Digital Thread is a communication framework that integrates data across the entire product lifecycle, providing a holistic view of the product's journey from design to manufacturing and even post-sale support.

_Purpose:_ It enables seamless data flow and traceability across traditionally siloed systems and processes. This interconnected data helps create a comprehensive view of the product at every stage.

_Components_: The Digital Thread encompasses the entire lifecycle of a product, connecting CAD (design), PLM (Product Lifecycle Management), ERP (Enterprise Resource Planning), and CRM (Customer Relationship Management) systems.


_Use Cases:_ Digital Thread helps track the evolution of a product over time, supports continuous improvements, and ensures that any change or issue is logged and accessible to stakeholders throughout the supply chain.


_Example_: For a jet engine, the Digital Thread would trace data from its initial design, through manufacturing, testing, and delivery, and continue capturing data on its in-field performance and maintenance. If a problem is identified in the field, the Digital Thread helps trace the issue back to a specific production batch or design decision, enabling quick root-cause analysis and resolution.


**Analogy**

Imagine a Digital Twin as a virtual mirror image of a car you own, which tracks its condition, mileage, fuel levels, and real-time performance. You can run simulations on this digital replica to see how it would perform with different tires or in harsh weather.
The Digital Thread, on the other hand, is like a dossier that contains all the information about that car—its design specs, manufacturing details, parts list, maintenance history, and any previous incidents—providing a full history from the moment it was conceptualized to its current state.
In essence, the Digital Twin is more focused on real-time representation and optimization, while the Digital Thread is about data continuity and lifecycle management. When used together, they provide a comprehensive digital representation and management strategy for complex systems.








## DT Smart Meter Application System (Electricity/Energy)
Creating a full-stack application with a Node.js backend and a React frontend that displays readings from an electricity meter can be quite comprehensive. 
Here’s a simplified version of the solution using TypeScript, Node.js, Express, React, and PostgreSQL.

## Summary

This example provides a basic full-stack application setup with a Node.js backend using Express and a React frontend. The backend fetches electricity meter readings from an external API and serves them via an endpoint. The frontend consumes this endpoint and displays the readings.

This setup can be extended with more features, error handling, database interactions, authentication, and other necessary functionalities as per requirements.

## Coding Steps

The metre reading values must  automatically update between every 30 seconds to 30 minutes. Should be part of an environmental variable which can easily be configured.

### Backend (Node.js with Express)

1. Setup the project:
```
mkdir electricity-meter-app-2
cd electricity-meter-app-2
mkdir backend
cd backend
npm init -y
npm install express pg cors dotenv
npm install --save-dev typescript ts-node @types/express @types/node @types/cors @types/pg
npx tsc --init
```

2. Package.json for FE and BE:

Here is a package.json file for the project that includes both the backend (Node.js with TypeScript) and the frontend (React). This file assumes you are using PostgreSQL for the backend. You can customize it further as per your requirements.

Front End:

```
{
  "name": "electricity-meter-digital-twin",
  "version": "1.0.0",
  "description": "A digital twin application for electricity meters using Node.js, TypeScript, React, and PostgreSQL.",
  "main": "backend/dist/index.js",
  "scripts": {
    "start:backend": "cd backend && npm run build && npm start",
    "start:frontend": "cd frontend && npm start",
    "start": "concurrently \"npm run start:backend\" \"npm run start:frontend\""
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/electricity-meter-digital-twin.git"
  },
  "author": "Alexander Adu-Sarkodie",
  "license": "MIT",
  "dependencies": {
    "concurrently": "^6.2.1"
  }
}

```

Backend (Node.js with TypeScript)

backend/package.json:

```
{
  "name": "backend",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node-dev src/index.ts"
  },
  "dependencies": {
    "axios": "^0.21.1",
    "express": "^4.17.1",
    "pg": "^8.5.1",
    "pg-hstore": "^2.3.3",
    "sequelize": "^6.6.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.11",
    "@types/node": "^14.14.31",
    "ts-node-dev": "^1.1.1",
    "typescript": "^4.2.3"
  }
}
```


backend/tsconfig.json:

```
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  }
}

```

3. Create the tsconfig.json:

This file is automatically generated by npx tsc --init and can be edited to suit your project needs.

4. Create the .env file:

```
DATABASE_URL=postgres://username:password@localhost:5432/electricity_meter_db

API_URL=http://external-api-for-readings.com

```

5. Create the folder structure:

```
mkdir src
touch src/index.ts src/database.ts src/routes.ts src/controllers.ts
```

6. Database setup (src/database.ts):

```
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;

```

7. Express server setup (src/index.ts):

```
import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

```

8.  Create routes (src/routes.ts):

```
import express from 'express';
import { getReadings } from './controllers';

const router = express.Router();

router.get('/readings', getReadings);

export default router;
```

9. Create controllers (src/controllers.ts):

```
import { Request, Response } from 'express';
import pool from './database';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const getReadings = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/readings`);
    const readings = response.data;
    // Save readings to the database if needed
    res.json(readings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching readings' });
  }
};

```
### Frontend (React with TypeScript)

10. Setup the project:

```
npx create-react-app frontend --template typescript
cd frontend
npm install axios

```
11. Create a service to fetch readings (src/services/api.ts):


```
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; //Move this into .env

export const getReadings = async () => {
  try {
    const response = await axios.get(`${API_URL}/readings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching readings', error);
    throw error;
  }
};

```


12. Create a component to display readings (src/components/Readings.tsx):

```
import React, { useEffect, useState } from 'react';
import { getReadings } from '../services/api';

interface Reading {
  id: number;
  value: number;
  timestamp: string;
}

const Readings: React.FC = () => {
  const [readings, setReadings] = useState<Reading[]>([]);

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const data = await getReadings();
        setReadings(data);
      } catch (error) {
        console.error('Error fetching readings', error);
      }
    };

    fetchReadings();
  }, []);

  return (
    <div>
      <h1>Electricity Meter Readings</h1>
      <ul>
        {readings.map((reading) => (
          <li key={reading.id}>
            {reading.timestamp}: {reading.value} kWh
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Readings;

```

13. Update App.tsx to include the Readings component:

```
import React from 'react';
import './App.css';
import Readings from './components/Readings';

const App: React.FC = () => {
  return (
    <div className="App">
      <Readings />
    </div>
  );
};

export default App;

```

Running the Backend and Frontend:


..................................

Ensure PostgreSQL is running and the database is set up. You can start the backend and frontend servers using the following commands:

14. Backend

```
cd backend
npx ts-node src/index.ts

```

15. Frontend

```
cd frontend
npm start
```



## Example: Using  Custom Object Data set

To demonstrate an example of object values from the https://external-api.example.com/meter-readings API, we need to simulate the response that such an API might return. Here's an example of the data structure that the external API could return:

1. JSON Object data from an Array:

```
[
  {
    "id": "1",
    "timestamp": "2023-06-28T12:00:00Z",
    "value": SMR-123.45
  },
  {
    "id": "2",
    "timestamp": "2023-06-28T13:00:00Z",
    "value": SMR-130.67
  },
  {
    "id": "3",
    "timestamp": "2023-06-28T14:00:00Z",
    "value": SMR-125.32
  }
]


```
To integrate this example data with the backend and frontend code we provided earlier, follow these steps:

2. Backend (Node.js, Express, TypeScript)

i. Simulate External API Response
For demonstration purposes, we'll replace the actual external API call with a mock response in meterService.ts.

src/meterService.ts

```
interface MeterReading {
  id: string;
  timestamp: string;
  value: number;
}

export const fetchMeterReadings = async (): Promise<MeterReading[]> => {
  // Simulating an external API response
  
  const mockResponse: MeterReading[] = [
    {
      id: '1',
      timestamp: '2023-06-28T12:00:00Z',
      value: SMR-123.45
    },
    {
      id: '2',
      timestamp: '2023-06-28T13:00:00Z',
      value: SMR-130.67
    },
    {
      id: '3',
      timestamp: '2023-06-28T14:00:00Z',
      value: SMR-125.32
    }
  ];
  return mockResponse;
};


```

3. Frontend (React, TypeScript)
No changes needed here (Layout), as the frontend is already set up to fetch and display the meter readings from the backend.

4. Running the Application

i. Backend
In the meter-readings-backend directory:

```

tsc node dist/index.js

```

ii. Frontend
In the meter-readings-frontend directory:


```

npm start

``` 
5. Summary:

Navigate to http://localhost:3000 in your browser to see the meter readings displayed. The frontend will display the mock readings provided by the backend.

This example shows how the backend simulates an external API response and serves it via an endpoint. The frontend consumes this endpoint and displays the readings.

