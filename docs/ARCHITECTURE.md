# Automation Architecture – Epicbet UI Tests

This project contains a small Playwright + TypeScript UI automation setup built for the Sisu assignment.  
The goal was not to create a large framework, but to show clean structure, stable selectors, and readable tests.

## Architecture Summary

- **Playwright Test** for execution across Chromium, Firefox, WebKit  
- **TypeScript** for clarity and type-safety  
- **Page Object Model (POM)** to keep selectors and page logic out of test files  
- **Minimal config**: HTML report, screenshots on failure, sensible timeouts  

## Folder Structure

project-sisu/
├─ docs/  
│  ├─ ARCHITECTURE.md  
│  ├─ TEST_PLAN.md  
│  └─ ERROR_HANDLING.md  
├─ pages/  
│  ├─ HomePage.ts  
│  ├─ SportsPage.ts  
│  ├─ CasinoPage.ts  
│  └─ PromotionsPage.ts  
├─ tests/epicbet.spec.ts  
├─ playwright.config.ts  
└─ package.json  

Each page file includes:
- stable selectors (based on visible text)
- navigation helpers (e.g., openSports, openPromotions)
- light assertions used by the test suite

## Key Decisions

- **No over-engineering**: one test file, four core flows (TC01–TC04).  
- **Selectors chosen from real failures**: visible text > brittle attributes.  
- **Cookie banner handled once in HomePage.ts** to avoid repeating logic.  
- **Tests stay readable**: navigation + assertion only, all details inside POM.

## What This Demonstrates

- Ability to structure a UI automation project cleanly  
- Ability to debug real UI failures and stabilise selectors  
- Ability to create maintainable tests that scale without becoming complex

This is intentionally lightweight, but structured the way a long-term Playwright project would begin.
