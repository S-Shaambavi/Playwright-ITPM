# Thanglish to Tamil Transliteration Test Automation

Automated testing suite for [Thanglish to Tamil Transliteration website](https://tamil.changathi.com/) using Playwright.

## 📋 Project Overview

This project automates testing of Tamil transliteration accuracy by:
- Converting Thanglish input to Tamil Unicode
- Comparing actual output with expert-verified expected output
- Generating detailed test reports for each run

## 🚀 Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## ▶️ Running Tests

Run all tests:
```bash
npm test
```

Run tests with UI mode:
```bash
npm run test:ui
```

Run tests in headed mode:
```bash
npm run test:headed
```

## 📊 Test Reports

Each test run automatically generates a **markdown report** in the `Report/` folder:
- **Location:** `Report/report.md`
- **Updated:** Every test execution

The report includes for each test case:
- Test Case ID
- Input (Thanglish text)
- Expect Output (Expected Tamil)
- Actual Output (System generated Tamil)
- Result (✅ PASS or ❌ FAIL)

**View Report:**
Open `Report/report.md` to see the latest test results.

## 🧪 Test Cases

### Positive Functional Tests (5 cases)
1. Simple present tense sentence
2. Simple past tense sentence
3. Question format
4. Command sentence
5. Compound sentence with numbers

### Negative Functional Tests (5 cases)
6. Joined words without spaces
7. Slang-heavy input
8. Very long paragraph
9. Multiple spaces and formatting
10. Mixed punctuation and symbols

## 📁 Project Structure

```
Playwright/
│
├── tests/
│   ├── positive-functional.spec.js
│   └── negative-functional.spec.js
│
├── Report/
│   └── report.md
│
├── custom-reporter.js
├── playwright.config.js
├── package.json
├── .gitignore
└── README.md
```

## 🔍 How It Works

The automation uses a custom `typeAndConvert()` function that:
1. Types text character-by-character with delays
2. Triggers space and backspace to finalize conversion
3. Captures the converted Tamil output
4. Compares with expected expert output

## 📝 Test Validation

**PASS**: Actual Output == Expert Output  
**FAIL**: Actual Output ≠ Expert Output

This ensures **accuracy-based validation**, not just character detection.

## 🛠️ Technologies

- **Playwright** - Test automation framework
- **Node.js** - Runtime environment
- **JavaScript** - Programming language

## 👤 Author

- IT23863552 Shaambavi S
