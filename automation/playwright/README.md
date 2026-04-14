# QA Playwright Portfolio

## 🔎 Live Test Execution Dashboard

**Check the latest automated test results here:**

🔗 [![Playwright Test Report](https://img.shields.io/badge/Playwright%20Test%20Report-View%20Results-blue)](https://LAttila-17.github.io/qa-playwright-portfolio/)

*This live dashboard is automatically updated daily via GitHub Actions and published using GitHub Pages.*

---

## 🧪 CI/CD pipelines

### Test Execution (on push)

🔗 [![Playwright Tests](https://github.com/LAttila-17/qa-playwright-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/LAttila-17/qa-playwright-portfolio/actions/workflows/playwright.yml)

*Runs automated Playwright tests on every push and pull request*


### Scheduled Report Publishing (daily)

🔗 [![Publish Report](https://github.com/LAttila-17/qa-playwright-portfolio/actions/workflows/playwright-report.yml/badge.svg)](https://github.com/LAttila-17/qa-playwright-portfolio/actions/workflows/playwright-report.yml)

*Runs nightly and publishes the latest test report to GitHub Pages*

---

## Test Results & Reporting

- Playwright HTML reports generated after each run
- Detailed test results including steps, errors, and traces

### Live Report (Recommended)

View the latest report online:

🔗 https://LAttila-17.github.io/qa-playwright-portfolio/

- **Automatically updated daily**
- Publicly accessible
- **No download** required

### View in CI (GitHub Actions)

- Go to the **Actions** tab in this repository
- Open the latest workflow run
- Download the **playwright-report** artifact

---

## Overview

This project is a QA Automation portfolio built with Playwright and TypeScript, showcasing:

- End-to-end testing of real-world scenarios
- Scalable test architecture
- CI/CD integration with automated pipelines
- Public test reporting via GitHub Pages

---

## Tech Stack

![Playwright](https://img.shields.io/badge/Tested%20with-Playwright-blue) ![Node.js](https://img.shields.io/badge/Node.js-24-green)


- **Playwright**
- **TypeScript**
- **Node.js / npm**
- GitHub Actions (**CI/CD**)
- HTML **test reporting**

---

## Test Coverage

This portfolio includes **end-to-end scenarios** for:

- Login functionality (valid / invalid cases)
- Product inventory validation
- Add to cart and cart state persistence
- Checkout process (form validation and completion)
- Error handling and validation messages

---

## Test Architecture

- **Page Object Model** (POM) design pattern
- **Separation** of test data, assertions, and page logic
- **Reusable** components (header, navigation)
- **Scalable** structure for adding new test scenarios

---

## CI/CD Highlights

- **Separate workflows** for test execution and report publishing
  - **Automated** cross-browser test execution **on push**
  - **Scheduled** nightly test runs
- **Continuous validation** of test stability
- HTML **report generation**
- Public **report hosting** via GitHub Pages
- Test **artifacts** available after pipeline runs

---

## Run Tests Manually

You can trigger a test run manually:

🔗 https://github.com/LAttila-17/qa-playwright-portfolio/actions/workflows/playwright-report.yml

Steps:
1. Click **Run workflow**
2. Start execution
3. View results in GitHub Actions or in the live dashboard

---

## Run Locally (Optional)

```bash
npm install
npx playwright install
npx playwright test
```

To view the HTML report:

```bash
npx playwright show-report
```

---

## Report Preview

![Playwright Report](./../../docs/Playwright-report.jpg)

---


## Future Improvements

- API mocking and network interception
- Advanced test scenarios
- Test data parameterization
- Parallel execution optimization