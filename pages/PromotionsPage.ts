import { Page, expect } from '@playwright/test';

export class PromotionsPage {
  constructor(private page: Page) {}

  async assertLoaded() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(/promo|bonus|welcome/i);

    const body = this.page.locator('body');
    await expect(body).toContainText(/bonus|promotion/i);
  }
}
