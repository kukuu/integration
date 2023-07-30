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
Example project: HMRC Payment Gateway - https://github.com/kukuu/HMRC-payment-gateway/tree/main/cinema-tickets-javascript

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
