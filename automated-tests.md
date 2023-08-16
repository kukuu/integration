# Automated Tests

In this article, I have provided a comprehensive suite of automated tests, including unit tests, integration tests, and end-to-end tests using JavaScript and some popular testing libraries.

Let's assume you are working on a Node.js application with the following file structure:

```
- src/
  - app.js
  - calculator.js
- test/
  - unit/
    - calculator.test.js
  - integration/
    - app.test.js
  - e2e/
    - app.e2e.test.js

```

## Unit Tests:
Unit tests focus on testing individual units of code in isolation, typically at the function or class level. We will use Jest as the testing framework for unit tests.

Install Jest and create a test file for the calculator.js module:

```
npm install jest --save-dev

```

calculator.test.js:

```
const Calculator = require('../src/calculator');

test('adds two numbers correctly', () => {
  const calc = new Calculator();
  expect(calc.add(2, 3)).toBe(5);
});

test('subtracts two numbers correctly', () => {
  const calc = new Calculator();
  expect(calc.subtract(5, 3)).toBe(2);
});

```
- Bench marking: https://github.com/kukuu/unit-tests-bench-marks/blob/main/unit-test-what-to-look-out-for.md

- Example project: HMRC Payment Gateway - https://github.com/kukuu/HMRC-payment-gateway/tree/main/cinema-tickets-javascript

## Integration Tests:
Integration tests verify interactions between different parts of the application. We will use Jest and Supertest for integration tests:

```
npm install supertest --save-dev

```
app.test.js:

```
const request = require('supertest');
const app = require('../src/app');

test('GET / should return "Hello, World!"', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(200);
  expect(response.text).toBe('Hello, World!');
});

```

## End-to-End Tests:
End-to-End (E2E) tests simulate real user interactions with the application. Jest, Cypress and Puppeteer are commonly used tools. We will use Jest and Puppeteer for E2E tests:

```
npm install puppeteer jest-puppeteer --save-dev

```
app.e2e.test.js:


```
const { test, expect } = require('@jest/globals');

const APP_URL = 'http://localhost:3000'; // Assuming the app is running locally on port 3000

test('should display "Hello, World!" on the home page', async () => {
  await page.goto(APP_URL);
  const text = await page.evaluate(() => document.body.textContent);
  expect(text).toContain('Hello, World!');
});

```
## Running Tests:

Add the following scripts to your package.json:

```
"scripts": {
  "test": "jest",
  "test:unit": "jest test/unit",
  "test:integration": "jest test/integration",
  "test:e2e": "jest test/e2e"
}

```
Now you can run the tests:

```
npm test                   // Run all tests (unit, integration, and e2e)
npm run test:unit          // Run unit tests
npm run test:integration   // Run integration tests
npm run test:e2e           // Run end-to-end tests


```
