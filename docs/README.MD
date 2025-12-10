# Sisu UI Automation – Epicbet Demo Framework

This repository contains a small UI automation framework built for the Sisu assignment.  
The goal is to demonstrate a clear structure, maintainable design, and stable selectors while covering four core user flows on the Epicbet website.

---

## 1. Project Goals
- Show how the project is structured using Playwright Test + TypeScript.
- Keep a clean separation between tests, page objects, and configuration.
- Use selectors that remain stable even when UI changes slightly.
- Provide short documentation on decisions and debugging steps.

---

## 2. Tech Stack
- **Node.js** (LTS)
- **Playwright Test** with **TypeScript**
- **VS Code** for development
- Optional: **GitHub Actions** for CI runs

---

## 3. Getting Started

### 3.1 Prerequisites
- Node.js 18+
- npm available on PATH

### 3.2 Install dependencies
From the project root:
```bash
npm install
```

### 3.3 Install Playwright browsers
```bash
npx playwright install
```

---

## 4. Project Structure

```
project-sisu/
│
├─ docs/
│   ├─ ARCHITECTURE.md        # Automation structure and design notes
│   ├─ TEST_PLAN.md           # Scope, in/out of scope, test cases (TC01–TC04)
│   └─ ERROR_HANDLING.md      # Actual failures found, causes, and fixes
│
├─ pages/
│   ├─ HomePage.ts            # Homepage navigation + cookie banner handling
│   ├─ SportsPage.ts          # Sports page checks
│   ├─ CasinoPage.ts          # Casino page checks
│   └─ PromotionsPage.ts      # Promotions page checks
│
├─ tests/
│   └─ epicbet.spec.ts        # Main test suite
│
├─ playwright.config.ts       # Browser config, timeouts, retries, reports
└─ package.json
```

---

## 5. Test Coverage

The framework covers four UI flows:

- **TC01 – Homepage loads**
  - Logo text visible  
  - Sports / Casino / Promotions navigation items visible  
  - Main banner visible  

- **TC02 – Sports page navigation**
  - Navigate via top menu  
  - Sports heading visible  
  - At least one sports event/category visible  

- **TC03 – Casino page navigation**
  - Navigate via top menu  
  - Casino heading visible  
  - At least one casino category/game block  

- **TC04 – Promotions page navigation**
  - Navigate via top menu  
  - Promotions heading visible  
  - At least one promotion card  

---

## 6. Running Tests

Run the full suite:
```bash
npx playwright test
```

Run only one test group:
```bash
npx playwright test -g "TC03"
```

Run a single file:
```bash
npx playwright test tests/epicbet.spec.ts
```

Open the report:
```bash
npx playwright show-report
```

---

## 7. Design Highlights

### Page Object Model
Each major page is separated into its own class.  
The tests only call page-level actions, keeping the test files short and readable.

### Selector Strategy
Selectors use:
- `getByText()` with exact matches  
- headings and labels  
- stable visible text rather than dynamic attributes  

This avoids brittle CSS selectors and keeps tests stable when markup changes.

### Cookie Banner
Epicbet shows a cookie banner on first load.  
A helper method dismisses it reliably before navigation continues.

### Cross-browser Execution
The project runs on Chromium, Firefox, and WebKit through Playwright’s built-in config.

### Error Documentation
Real failures during development were captured and analyzed in `ERROR_HANDLING.md`.  
This includes the wrong selectors originally used and the corrected versions.

---

## 8. CI (Optional)
A GitHub Actions workflow is included for running the same suite in CI:

- Install dependencies  
- Install Playwright browsers  
- Run tests  
- Upload HTML report as an artifact  

This mirrors how the project would behave in a real pipeline.

---

## 9. Notes
The scope intentionally stays small.  
The aim is to show structure, clarity, and reliability rather than full coverage of the entire site.

