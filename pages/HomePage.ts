import { Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://epicbet.com/en', { waitUntil: 'networkidle' });
  }

  async dismissCookieBanner() {
    // Generic cookie accept button – safe best effort
    const cookieButton = this.page
      .locator('button, [role="button"]')
      .filter({ hasText: /accept|agree|ok|got it/i })
      .first();

    if (await cookieButton.isVisible().catch(() => false)) {
      await cookieButton.click();
    }
  }

  async assertLoaded() {
    await this.page.waitForLoadState('networkidle');
    await this.dismissCookieBanner();

    // Logo text somewhere on the page
    await expect(this.page.locator('body')).toContainText(/epicbet/i);

    // Basic nav sanity – we just check text exists
    await expect(this.page.locator('body')).toContainText(/sports/i);
    await expect(this.page.locator('body')).toContainText(/casino/i);
    await expect(this.page.locator('body')).toContainText(/promotions/i);
  }

  async openSports() {
    await this.page.waitForLoadState('networkidle');
    await this.dismissCookieBanner();
    // Click ANY visible "Sports" text
    await this.page.getByText(/sports/i, { exact: false }).first().click();
  }

 async openCasino() {
  await this.dismissCookieBanner();

  // Click the Casino item from the top header nav only
  const header = this.page.locator('header');
  await header.getByText(/^Casino$/i).first().click();
}


  async openPromotions() {
    //  We STOP clicking header here and just navigate directly
    await this.page.goto('https://epicbet.com/en/user/account/promotions/', {
      waitUntil: 'networkidle',
    });
  }
}
