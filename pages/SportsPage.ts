import { Page, expect } from '@playwright/test';

export class SportsPage {
  constructor(private page: Page) {}

  async assertLoaded() {
    // Wait for the page to stabilise
    await this.page.waitForLoadState('networkidle');

    // URL should look like a sports page
    await expect(this.page).toHaveURL(/sport/i);

    // Basic content checks on the page body – no strict-mode headaches
    const body = this.page.locator('body');

    // Page should clearly mention Sports somewhere
    await expect(body).toContainText(/sports/i);

    // And some kind of event/odds wording – loose but meaningful
    await expect(body).toContainText(/odds|events|matches|live betting/i);
  }
}
