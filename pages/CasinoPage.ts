import { Page, expect } from '@playwright/test';

export class CasinoPage {
  constructor(private page: Page) {}

  async assertLoaded() {
    // Wait for network to settle
    await this.page.waitForLoadState('networkidle');

    // URL should clearly be some casino section
    await expect(this.page).toHaveURL(/casino/i);

    const body = this.page.locator('body');

    // Page should mention Casino somewhere
    await expect(body).toContainText(/casino/i);

    // And something that looks like game content
    await expect(body).toContainText(/games|slots|live casino/i);
  }
}
