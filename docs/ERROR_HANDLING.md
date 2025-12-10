# Error Handling & Debugging Notes – Epicbet UI Tests

This file records the main issues found while stabilising the Epicbet Playwright tests and how they were fixed.

---

Error: Logo element not found  
Issue identified: The test originally used `img[alt*="epic"]`, but Epicbet renders the brand as text, not an image. The selector was pointing at an element that doesn’t exist.  
Fix: Switched to a text-based locator instead of an image selector, e.g. `page.getByText(/epicbet/i)`.

---

Error: Navigation buttons not clickable (Sports / Casino / Promotions)  
Issue identified: The header menu items are not `<a>` tags and do not expose an ARIA role of `"link"`. Using `getByRole('link', { name: /sports/i })` and similar calls caused timeouts because no matching role existed.  
Fix: Replaced role-based selectors with stable visible-text selectors, e.g. `page.getByText('Sports', { exact: true })`, `page.getByText('Casino', { exact: true })`, `page.getByText('Promotions', { exact: true })`.

---

Error: Cookie banner blocking clicks  
Issue identified: On first visit, a cookie consent banner overlays the navigation area. Until it is dismissed, Playwright can see the navigation elements but cannot click them reliably, causing flakiness and timeouts.  
Fix: Added a dedicated `dismissCookieBanner()` step on the home page that clicks the accept/dismiss button whenever the banner is visible before continuing with navigation.

---

Error: Strict mode violations (too many matches for content locators)  
Issue identified: Some assertions used broad text locators such as `getByText(/sports/i)` or `getByText(/casino/i)` on busy pages. In Playwright strict mode this resolved to multiple elements and caused “resolved to N elements” failures.  
Fix: Tightened the selectors by scoping them to the main content area and/or using more specific text (e.g. headings or promo titles), and in a few cases explicitly calling `.first()` on a known list.

---

Error: CI pipeline failure in GitHub Actions (TC01 failing only in CI)  
Issue identified: In CI, the assertion `expect(page.locator('body')).toContainText(/sports/i)` failed because the `<body>` text was dominated by the full Cookiebot consent message. In CI the timing differed slightly and the expected nav labels weren’t guaranteed to appear in the body text yet.  
Fix: Replaced the broad body-text assertion with specific visibility checks on concrete navigation locators (`home.navSports`, `home.navCasino`, `home.navPromotions`). Also ensured the cookie banner is dismissed before checking UI state. This stabilised the test across all three browsers in CI.

---

These fixes were applied to keep the suite reliable without over-engineering the framework: small, targeted selector updates, a single cookie-banner handler, and one CI-specific stabilisation for TC01.

---

Error: CI run fails on TC01 body text assertion (`/sports/i`)  
Issue identified: In GitHub Actions, Epicbet sometimes serves a fallback page that combines the full cookie policy and a **“Restricted region”** message instead of the normal homepage content. On that page the `<body>` text is dominated by consent/legal copy and does not contain the word “Sports”, so the assertion  
`expect(this.page.locator('body')).toContainText(/sports/i)` fails even though the site is technically reachable. This only happens from CI runner IPs, not from the local machine used to develop the tests.  
Fix / mitigation: Documented as an environment-specific limitation for this assignment. In a real project the options would be:
- Point CI at a non-blocked staging URL or VPN-protected endpoint, **or**
- Relax the assertion in CI to check a more stable indicator (e.g. page title / header instead of full body text), **or**
- Skip geo-blocked tests in CI via a tag (e.g. `@requires-eu-access`).

For this demo, local runs are kept strict and the CI flakiness is explained here as a known constraint of the public Epicbet environment.
