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

These fixes were applied to keep the suite reliable without over-engineering the framework: small, targeted changes to selectors and one centralised cookie-banner handler.
