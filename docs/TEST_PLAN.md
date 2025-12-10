# Test Plan – Epicbet UI Automation (Sisu Assignment)

## 1. Objective

Show how I design a small but maintainable UI automation suite for the **Epicbet** website using Playwright + TypeScript.  
The goal is to demonstrate structure and thinking, not to build a full regression pack.

---

## 2. Scope

### 2.1 In Scope

The following flows are covered:

- Loading the Epicbet **homepage**
- Navigating to **Sports** page and checking core content
- Navigating to **Casino** page and checking core content
- Navigating to **Promotions** page and checking promo tiles
- Handling the **cookie banner** so it does not block navigation
- Running the same tests across Playwright’s default browsers:
  - Chromium
  - Firefox
  - WebKit

### 2.2 Out of Scope

The following are explicitly out of scope for this assignment:

- Login, registration, KYC, or account management
- Deposits, withdrawals, bet placement, or any payment flows
- API / back-end validation
- Deep functional coverage of odds, markets, or game behaviour
- Performance, load, or security testing
- Visual / responsive layout checks
- Localization and language switching

---

## 3. Test Approach

- **Framework**: Playwright Test with **TypeScript**
- **Design**: Page Object Model (separate `pages/` and `tests/`)
- **Single spec file**: `tests/epicbet.spec.ts` with four main test cases (TC01–TC04)
- **Page objects**:
  - `HomePage.ts`
  - `SportsPage.ts`
  - `CasinoPage.ts`
  - `PromotionsPage.ts`
- **Stability measures**:
  - Use visible text selectors instead of fragile CSS/XPath
  - Centralised handling of the cookie banner
  - Simple assertions focused on “page loaded and key content visible”

### 3.1 Test Data

- Public Epicbet environment (no credentials required)
- No user-specific test data – all checks are read-only (content/visibility only)

### 3.2 Entry Criteria

- Node.js and npm installed
- Project dependencies installed: `npm install`
- Playwright browsers installed: `npx playwright install`
- Epicbet site is reachable and responsive

### 3.3 Exit Criteria

- All four core flows (TC01–TC04) pass on Chromium, Firefox, and WebKit
- Any known issues or flaky behaviour is captured in `ERROR_HANDLING.md`

---

## 4. Test Scenarios

### TC01 – Homepage loads with key elements

**Goal:** Confirm that the main entry page loads and the primary navigation is usable.

**Steps:**

1. Navigate to the Epicbet homepage.
2. Verify the Epicbet brand text/logo is visible.
3. Verify the top navigation shows **Sports**, **Casino**, and **Promotions**.
4. Ensure the cookie banner (if present) is dismissed so navigation is not blocked.

**Expected Result:**  
Homepage is loaded, branding is visible, and the main navigation items can be used.

---

### TC02 – Sports page navigation and content

**Goal:** Verify that the Sports page is reachable from the homepage and basic content is shown.

**Steps:**

1. From the homepage, click **Sports** in the main navigation.
2. Wait for the Sports page to load.
3. Verify a Sports heading/label is visible.
4. Verify at least one sports category or events block is visible.

**Expected Result:**  
Sports page opens and shows sports-related content (categories / events) without errors.

---

### TC03 – Casino page navigation and games

**Goal:** Verify that the Casino page is reachable and shows casino game content.

**Steps:**

1. From the homepage, click **Casino** in the main navigation.
2. Dismiss the cookie banner if it appears.
3. Wait for the Casino page to load.
4. Verify a Casino heading/label is visible.
5. Verify at least one casino game or game category tile is visible.

**Expected Result:**  
Casino page opens and at least one casino game or tile is visible to the user.

---

### TC04 – Promotions page navigation and offers

**Goal:** Verify that the Promotions page is reachable and shows active promotions.

**Steps:**

1. From the homepage, click **Promotions** in the main navigation.
2. Dismiss the cookie banner if it appears.
3. Wait for the Promotions page to load.
4. Verify that promotion tiles/cards are visible (e.g. “Welcome Bonus”, “Christmas Missions” etc.).

**Expected Result:**  
Promotions page opens and at least one promotion tile is visible and readable.

---

## 5. Risks & Assumptions

- Public site content may change (text, number of tiles), so tests focus on **structure and visibility**, not exact copy.
- Third-party overlays (cookie banner, popups) can temporarily block elements; these are handled centrally in the page objects.
- Network slowness may cause occasional timeouts; Playwright timeouts are tuned but kept reasonable.

---

## 6. Reporting

- Test execution: `npx playwright test`
- HTML report: `npx playwright show-report`
- Any non-obvious failures and root causes are written into `docs/ERROR_HANDLING.md` for reviewers.
