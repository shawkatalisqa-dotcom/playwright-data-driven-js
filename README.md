# Playwright Data-Driven Automation (JavaScript)

## Objective
This project demonstrates a **data-driven Playwright test framework** using JavaScript and Page Object Model (POM).
Test scenarios are driven from JSON to minimize duplication and improve scalability.

## Tech Stack
- Playwright Test
- JavaScript (Node.js)
- Page Object Model (POM)
- JSON-based test data

## Project Structure
- pages/ # Page Objects (Login, Boards)
- test-data/ # JSON-driven test scenarios
- tests/ # Test specs

## Test Coverage
- Login automation
- Web Application board validations
- Mobile Application board validations
- Column-based card verification
- Tag assertions per work item

## How to Run
```bash
npm install
npx playwright install
npm test