import { test, expect } from '@playwright/test';

test('Liste Users', async ({ page }) => {
  await page.goto('http://localhost:4200');
  await page.waitForSelector('app-user-card')

  const nbCards = await page.$$('app-user-card')
  expect(nbCards.length).toBeGreaterThan(0)

  const searchInput = await page.getByPlaceholder('Rechercher')
  await searchInput.fill('Leanne')
});