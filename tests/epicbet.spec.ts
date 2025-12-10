import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SportsPage } from '../pages/SportsPage';
import { CasinoPage } from '../pages/CasinoPage';
import { PromotionsPage } from '../pages/PromotionsPage';

test.describe('Epicbet main flows (Sisu assignment)', () => {
  test('TC01 – Homepage loads with key elements', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await home.assertLoaded();
  });

  test('TC02 – Sports page navigation and content', async ({ page }) => {
    const home = new HomePage(page);
    const sports = new SportsPage(page);

    await home.goto();
    await home.openSports();
    await sports.assertLoaded();
  });

  test('TC03 – Casino page navigation and games', async ({ page }) => {
    const home = new HomePage(page);
    const casino = new CasinoPage(page);

    await home.goto();
    await home.openCasino();
    await casino.assertLoaded();
  });

  test('TC04 – Promotions page navigation and offers', async ({ page }) => {
    const home = new HomePage(page);
    const promotions = new PromotionsPage(page);

    await home.goto();
    await home.openPromotions();
    await promotions.assertLoaded();
  });
});
