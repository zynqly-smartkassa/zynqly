import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/ride-history`);
  await expect(page).toHaveURL(`${baseURL}/ride-history`);
})

// ── Search ────────────────────────────────────────────────────────────────────

test.describe('Search', () => {

  test('search by ID shows only the matching ride', async ({ page }) => {

    // 1. Wait for data
    const typeCells = page.getByTestId('ride-history-row-type');
    await expect(typeCells.first()).toBeVisible({ timeout: 10000 });

    // 2. Read the first row's displayed (shortened) ID — IDs are random UUIDs,
    //    so we derive the search term from the data instead of hardcoding it.
    const firstIdCell = page.locator('tbody tr').first().locator('td').first();
    const displayedId = ((await firstIdCell.textContent()) ?? '').trim().replace(/^#/, '');
    expect(displayedId.length).toBeGreaterThan(0);

    // 3. Type that ID into the search
    const search = page.getByTestId('ride-history-search-input');
    await search.click();
    await search.pressSequentially(displayedId);

    await expect(search).toHaveValue(displayedId, { timeout: 5000 });

    // 4. Exactly one row should be visible and show that ID
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(1);
    await expect(rows.first().locator('td').first()).toContainText(displayedId);
  });

  test('search by city shows all rides that contain that city', async ({ page }) => {

    // 1. Wait for data
    const typeCells = page.getByTestId('ride-history-row-type');
    await expect(typeCells.first()).toBeVisible({ timeout: 10000 });

    // 2. Search for "Berlin" — R-1046 and R-1045 contain "Berlin" in from/to
    const search = page.getByTestId('ride-history-search-input');
    await search.click();
    await search.pressSequentially('Berlin');

    await expect(search).toHaveValue('Berlin', { timeout: 5000 });

    // 3. Every visible row must have "Berlin" in from OR to
    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const from = row.locator('td').nth(3);
      const to = row.locator('td').nth(4);
      const fromText = await from.textContent() ?? '';
      const toText = await to.textContent() ?? '';
      expect(fromText + toText).toContain('Berlin');
    }
  });

  test('no results shown when search matches nothing', async ({ page }) => {

    // 1. Wait for data
    const typeCells = page.getByTestId('ride-history-row-type');
    await expect(typeCells.first()).toBeVisible({ timeout: 10000 });

    // 2. Type a term that cannot possibly match
    const search = page.getByTestId('ride-history-search-input');
    await search.click();
    await search.pressSequentially('XXXXXXXXXNOTEXISTENT');
    await expect(search).toHaveValue('XXXXXXXXXNOTEXISTENT', { timeout: 5000 });

    // 3. No ride rows visible and empty state message shown
    await expect(typeCells).toHaveCount(0, { timeout: 5000 });
    await expect(page.getByText('Keine Fahrten gefunden.').filter({ visible: true })).toBeVisible();
  });

});

// ── Filters ───────────────────────────────────────────────────────────────────

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

      // 4. Every visible row must be "Boten"
      const allTypeCells = await typeCells.all();
      for (const cell of allTypeCells) {
        await expect(cell).toContainText('Boten');
      }
    });

    test('shows only "Passagier" rides', async ({ page }) => {

      // 1. wait until data is loaded and initialize locator
      const typeCells = page.getByTestId('ride-history-row-type');
      await expect(typeCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Select Passagier
      const trigger = page.getByTestId('ride-history-filter-type-trigger');
      await trigger.click();
      await page.getByRole('option', { name: 'Passagier' }).click();

      // 3. Trigger now shows 'Passagier' as text
      await expect(trigger).toHaveText('Passagier');
      await expect(typeCells.first()).toBeVisible({ timeout: 5000 });

      // 4. Every visible row must be "Passagier"
      const allTypeCells = await typeCells.all();
      for (const cell of allTypeCells) {
        await expect(cell).toContainText('Passagier');
      }
    });

  });

  test.describe('Settlement filter', () => {

    test('shows only "Karte" rides', async ({ page }) => {

      // 1. wait until data is loaded and initialize locator
      const settlementCells = page.getByTestId('ride-history-row-settlement');
      await expect(settlementCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Select Karte
      const trigger = page.getByTestId('ride-history-filter-settlement-trigger');
      await trigger.click();
      await page.getByRole('option', { name: 'Karte' }).click();

      // 3. Trigger now shows 'Karte'
      await expect(trigger).toHaveText('Karte');
      await expect(settlementCells.first()).toBeVisible({ timeout: 5000 });

      // 4. Every visible row must show "Karte"
      const allCells = await settlementCells.all();
      for (const cell of allCells) {
        await expect(cell).toContainText('Karte');
      }
    });

    test('shows only "Bar" rides', async ({ page }) => {

      // 1. wait until data is loaded and initialize locator
      const settlementCells = page.getByTestId('ride-history-row-settlement');
      await expect(settlementCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Select Bar
      const trigger = page.getByTestId('ride-history-filter-settlement-trigger');
      await trigger.click();
      await page.getByRole('option', { name: 'Bar' }).click();

      // 3. Trigger now shows 'Bar'
      await expect(trigger).toHaveText('Bar');
      await expect(settlementCells.first()).toBeVisible({ timeout: 5000 });

      // 4. Every visible row must show "Bar"
      const allCells = await settlementCells.all();
      for (const cell of allCells) {
        await expect(cell).toContainText('Bar');
      }
    });

  });

  test.describe('Status filter', () => {

    test('shows only "Abgeschlossen" rides', async ({ page }) => {

      // 1. wait until data is loaded and initialize locator
      const statusCells = page.getByTestId('ride-history-row-status');
      await expect(statusCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Select Abgeschlossen
      const trigger = page.getByTestId('ride-history-filter-status-trigger');
      await trigger.click();
      await page.getByRole('option', { name: 'Abgeschlossen' }).click();

      // 3. Trigger now shows 'Abgeschlossen'
      await expect(trigger).toHaveText('Abgeschlossen');
      await expect(statusCells.first()).toBeVisible({ timeout: 5000 });

      // 4. Every visible row must show "Abgeschlossen"
      const allCells = await statusCells.all();
      for (const cell of allCells) {
        await expect(cell).toContainText('Abgeschlossen');
      }
    });

    test('shows only "Storniert" rides', async ({ page }) => {

      // 1. wait until data is loaded and initialize locator
      const statusCells = page.getByTestId('ride-history-row-status');
      await expect(statusCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Select Storniert
      const trigger = page.getByTestId('ride-history-filter-status-trigger');
      await trigger.click();
      await page.getByRole('option', { name: 'Storniert' }).click();

      // 3. Trigger now shows 'Storniert'
      await expect(trigger).toHaveText('Storniert');
      await expect(statusCells.first()).toBeVisible({ timeout: 5000 });

      // 4. Every visible row must show "Storniert"
      const allCells = await statusCells.all();
      for (const cell of allCells) {
        await expect(cell).toContainText('Storniert');
      }
    });

    test('shows only "Ausstehend" rides', async ({ page }) => {

      // 1. wait until data is loaded and initialize locator
      const statusCells = page.getByTestId('ride-history-row-status');
      await expect(statusCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Select Ausstehend
      const trigger = page.getByTestId('ride-history-filter-status-trigger');
      await trigger.click();
      await page.getByRole('option', { name: 'Ausstehend' }).click();

      // 3. Trigger now shows 'Ausstehend'
      await expect(trigger).toHaveText('Ausstehend');
      await expect(statusCells.first()).toBeVisible({ timeout: 5000 });

      // 4. Every visible row must show "Ausstehend"
      const allCells = await statusCells.all();
      for (const cell of allCells) {
        await expect(cell).toContainText('Ausstehend');
      }
    });

  });

  test.describe('Reset filter', () => {

    test('should reset all active filters', async ({ page }) => {

      // 1. Activate all three filters
      const typeTrigger = page.getByTestId('ride-history-filter-type-trigger');
      await typeTrigger.click();
      await page.getByRole('option', { name: 'Boten' }).click();

      const settlementTrigger = page.getByTestId('ride-history-filter-settlement-trigger');
      await settlementTrigger.click();
      await page.getByRole('option', { name: 'Karte' }).click();

      const statusTrigger = page.getByTestId('ride-history-filter-status-trigger');
      await statusTrigger.click();
      await page.getByRole('option', { name: 'Abgeschlossen' }).click();

      // 2. Verify all filters are active
      await expect(typeTrigger).toHaveText('Boten');
      await expect(settlementTrigger).toHaveText('Karte');
      await expect(statusTrigger).toHaveText('Abgeschlossen');

      // 3. Click the visible reset button
      const resetButton = page.getByTestId('ride-history-reset-button').filter({ visible: true });
      await resetButton.click();

      // 4. All triggers must no longer show the selected value
      await expect(typeTrigger).not.toHaveText('Boten');
      await expect(settlementTrigger).not.toHaveText('Karte');
      await expect(statusTrigger).not.toHaveText('Abgeschlossen');
    });

  });

  test.describe('Combined filters', () => {

    test('type "Boten" + settlement "Karte" shows only matching rides', async ({ page }) => {

      // 1. Wait for data
      // Data guarantee: page 1 contains at least two Boten + Karte rides (München, Zürich)
      const typeCells = page.getByTestId('ride-history-row-type');
      const settlementCells = page.getByTestId('ride-history-row-settlement');
      await expect(typeCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Apply both filters
      const typeTrigger = page.getByTestId('ride-history-filter-type-trigger');
      await typeTrigger.click();
      await page.getByRole('option', { name: 'Boten' }).click();

      const settlementTrigger = page.getByTestId('ride-history-filter-settlement-trigger');
      await settlementTrigger.click();
      await page.getByRole('option', { name: 'Karte' }).click();

      // 3. Wait for filtered results
      await expect(typeCells.first()).toBeVisible({ timeout: 5000 });

      // 4. Every visible row must be "Boten" AND "Karte"
      const allTypeCells = await typeCells.all();
      const allSettlementCells = await settlementCells.all();

      for (const cell of allTypeCells) {
        await expect(cell).toContainText('Boten');
      }
      for (const cell of allSettlementCells) {
        await expect(cell).toContainText('Karte');
      }
    });

    test('type "Passagier" + search "Berlin" shows only matching rides', async ({ page }) => {

      // 1. Wait for data
      // Data guarantee: page 1 contains a Passagier ride with "Berlin" in its route
      const typeCells = page.getByTestId('ride-history-row-type');
      await expect(typeCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Select Passagier
      const typeTrigger = page.getByTestId('ride-history-filter-type-trigger');
      await typeTrigger.click();
      await page.getByRole('option', { name: 'Passagier' }).click();

      // 3. Search for "Berlin"
      const search = page.getByTestId('ride-history-search-input');
      await search.click();
      await search.pressSequentially('Berlin');
      await expect(search).toHaveValue('Berlin', { timeout: 5000 });

      // 4. Every visible row must be "Passagier" ...
      const allTypeCells = await typeCells.all();
      for (const cell of allTypeCells) {
        await expect(cell).toContainText('Passagier');
      }

      // ... AND from or to must contain "Berlin"
      const rows = page.locator('tbody tr');
      const rowCount = await rows.count();
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const from = row.locator('td').nth(3);
        const to = row.locator('td').nth(4);
        const fromText = await from.textContent() ?? '';
        const toText = await to.textContent() ?? '';
        expect(fromText + toText).toContain('Berlin');
      }
    });
  });
});

// ── Pagination ────────────────────────────────────────────────────────────────

test.describe('Pagination', () => {

  test('page 1 shows exactly 6 rides', async ({ page }) => {

    // 1. Wait for data (46 entries total, page size = 6 → page 1 is always full)
    const rows = page.locator('tbody tr');
    const typeCells = page.getByTestId('ride-history-row-type');
    await expect(typeCells.first()).toBeVisible({ timeout: 10000 });

    // 2. Page 1 must show exactly 6 rides
    await expect(rows).toHaveCount(6);
  });

  test('"previous" button is disabled on page 1', async ({ page }) => {

    // 1. Wait for data
    const typeCells = page.getByTestId('ride-history-row-type');
    await expect(typeCells.first()).toBeVisible({ timeout: 10000 });

    // 2. Prev button must be disabled on the first page
    const prevBtn = page.getByTestId('ride-history-pagination-prev');
    await expect(prevBtn).toBeDisabled();
  });

  test('clicking "next" loads page 2 with different rides', async ({ page }) => {

    // 1. Wait for data and record the first ride ID on page 1
    const typeCells = page.getByTestId('ride-history-row-type');
    await expect(typeCells.first()).toBeVisible({ timeout: 10000 });
    const firstRowPage1 = page.locator('tbody tr').first();
    const firstIdPage1 = await firstRowPage1.locator('td').first().textContent();

    // 2. Navigate to page 2
    const nextBtn = page.getByTestId('ride-history-pagination-next');
    await nextBtn.click();

    // 3. Table updates — first row ID is different and page 2 shows 6 rides
    await expect(page.locator('tbody tr').first().locator('td').first()).not.toHaveText(firstIdPage1 ?? '', { timeout: 10000 });
    await expect(typeCells.first()).toBeVisible();
    await expect(page.locator('tbody tr')).toHaveCount(6);
  });

  test('clicking "previous" from page 2 returns to page 1', async ({ page }) => {

    // 1. Wait for data and record the first ride ID on page 1
    const typeCells = page.getByTestId('ride-history-row-type');
    await expect(typeCells.first()).toBeVisible({ timeout: 10000 });
    const firstIdPage1 = await page.locator('tbody tr').first().locator('td').first().textContent();

    // 2. Navigate to page 2
    await page.getByTestId('ride-history-pagination-next').click();
    await expect(page.locator('tbody tr').first().locator('td').first()).not.toHaveText(firstIdPage1 ?? '', { timeout: 10000 });

    // 3. Navigate back to page 1
    await page.getByTestId('ride-history-pagination-prev').click();

    // 4. First ride ID must match page 1 again
    await expect(page.locator('tbody tr').first().locator('td').first()).toHaveText(firstIdPage1 ?? '', { timeout: 10000 });
  });

  test('"next" button is disabled on the last page', async ({ page }) => {

    // 1. Wait for data
    const typeCells = page.getByTestId('ride-history-row-type');
    await expect(typeCells.first()).toBeVisible({ timeout: 10000 });

    // 2. Navigate to the last page by clicking next until the button becomes disabled
    const nextBtn = page.getByTestId('ride-history-pagination-next');
    while (await nextBtn.isEnabled()) {
      await nextBtn.click();
      await page.waitForTimeout(300);
    }

    // 3. Next button must be disabled on the last page
    await expect(nextBtn).toBeDisabled();
  });

});
