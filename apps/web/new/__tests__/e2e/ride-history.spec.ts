import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/ride-history`);
  await expect(page).toHaveURL(`${baseURL}/ride-history`);
})

test.describe('Filters', () => {

  test.describe('Type filter', () => {

    test('shows only "Boten" rides', async ({ page }) => {

      // 1. wait until data is loaded and initialize locator
      const typeCells = page.getByTestId('ride-history-row-type');
      await expect(typeCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Select Boten
      const trigger = page.getByTestId('ride-history-filter-type-trigger');
      await trigger.click();
      await page.getByRole('option', { name: 'Boten' }).click();

      // 3. Trigger now shows 'Boten' as text
      await expect(trigger).toHaveText('Boten');
      await expect(typeCells.first()).toBeVisible({ timeout: 5000 });

      // 4. Now get the list from the locator and check
      const allTypeCells = await typeCells.all();
      for (const cell of allTypeCells) {
        await expect(cell).toContainText('Boten');
      }
    });

    test('shows only "Passagier" rides', async ({ page }) => {

      // 1. wait until data is loaded and initialize locator
      const typeCells = page.getByTestId('ride-history-row-type');
      await expect(typeCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Select Boten
      const trigger = page.getByTestId('ride-history-filter-type-trigger');
      await trigger.click();
      await page.getByRole('option', { name: 'Passagier' }).click();

      // 3. Trigger now shows 'Boten' as text
      await expect(trigger).toHaveText('Passagier');
      await expect(typeCells.first()).toBeVisible({ timeout: 5000 });

      const allTypeCells = await typeCells.all();
      for (const cell of allTypeCells) {
        await expect(cell).toContainText('Passagier');
      }
    });
  });

  test.describe('Settlement filter', () => {

    test('shows only "Karte" rides', async ({ page }) => {
      // TODO
    });

    test('shows only "Bar" rides', async ({ page }) => {
      // TODO
    });

  });

  test.describe('Status filter', () => {

    test('shows only "Abgeschlossen" rides', async ({ page }) => {
      // TODO
    });

    test('shows only "Storniert" rides', async ({ page }) => {
      // TODO
    });

    test('shows only "Ausstehend" rides', async ({ page }) => {
      // TODO
    });

  });

});
