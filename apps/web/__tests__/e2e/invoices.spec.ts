import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/invoices`);
  await expect(page).toHaveURL(`${baseURL}/invoices`);
});

// ── Search ────────────────────────────────────────────────────────────────────

test.describe("Search", () => {

  test("search by invoice ID shows only the matching invoice", async ({ page }) => {

    // 1. Wait for real data rows (statusCells only exist on data rows, not skeletons)
    const statusCells = page.getByTestId("invoices-row-status");
    await expect(statusCells.first()).toBeVisible({ timeout: 10000 });
    const rows = page.locator("tbody tr");
    const firstId = await rows.first().locator("td").first().textContent() ?? "";
    expect(firstId.trim().length).toBeGreaterThan(0);

    // 2. Search for that specific ID
    const search = page.getByTestId("invoices-search-input");
    await search.click();
    await search.pressSequentially(firstId.trim());
    await expect(search).toHaveValue(firstId.trim(), { timeout: 5000 });

    // 3. Exactly one row should be visible and contain that ID
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText(firstId.trim());
  });

  test("search by customer name shows only matching invoices", async ({ page }) => {

    // 1. Wait for real data rows (statusCells only exist on data rows, not skeletons)
    const statusCells = page.getByTestId("invoices-row-status");
    await expect(statusCells.first()).toBeVisible({ timeout: 10000 });
    const rows = page.locator("tbody tr");
    const customer = await rows.first().locator("td").nth(3).textContent() ?? "";
    expect(customer.trim().length).toBeGreaterThan(0);

    // 2. Search for that customer
    const search = page.getByTestId("invoices-search-input");
    await search.click();
    await search.pressSequentially(customer.trim());
    await expect(search).toHaveValue(customer.trim(), { timeout: 5000 });

    // 3. Every visible row must have that customer
    const allRows = await rows.all();
    expect(allRows.length).toBeGreaterThan(0);
    for (const row of allRows) {
      await expect(row.locator("td").nth(3)).toContainText(customer.trim());
    }
  });

  test("no results shown when search matches nothing", async ({ page }) => {

    // 1. Wait for real data rows
    const statusCells = page.getByTestId("invoices-row-status");
    await expect(statusCells.first()).toBeVisible({ timeout: 10000 });

    // 2. Type a term that cannot possibly match
    const search = page.getByTestId("invoices-search-input");
    await search.click();
    await search.pressSequentially("XXXXXXXXXNOTEXISTENT");
    await expect(search).toHaveValue("XXXXXXXXXNOTEXISTENT", { timeout: 5000 });

    // 3. No rows visible and empty state shown
    await expect(statusCells).toHaveCount(0, { timeout: 5000 });
    await expect(page.getByText("Keine Rechnungen gefunden.").filter({ visible: true })).toBeVisible();
  });

});

// ── Filters ───────────────────────────────────────────────────────────────────

test.describe("Filters", () => {

  test.describe("Status filter", () => {

    test('shows only "Bezahlt" invoices', async ({ page }) => {

      // 1. Wait for data
      const statusCells = page.getByTestId("invoices-row-status");
      await expect(statusCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Select Bezahlt
      const trigger = page.getByTestId("invoices-filter-status-trigger");
      await trigger.click();
      await page.getByRole("option", { name: "Bezahlt" }).click();

      // 3. Trigger now shows "Bezahlt"
      await expect(trigger).toHaveText("Bezahlt");
      await expect(statusCells.first()).toBeVisible({ timeout: 5000 });

      // 4. Every visible status cell must say "Bezahlt"
      for (const cell of await statusCells.all()) {
        await expect(cell).toContainText("Bezahlt");
      }
    });

    test('shows only "Ausstehend" invoices', async ({ page }) => {

      // 1. Wait for data
      const statusCells = page.getByTestId("invoices-row-status");
      await expect(statusCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Select Ausstehend
      const trigger = page.getByTestId("invoices-filter-status-trigger");
      await trigger.click();
      await page.getByRole("option", { name: "Ausstehend" }).click();

      // 3. Trigger now shows "Ausstehend"
      await expect(trigger).toHaveText("Ausstehend");
      await expect(statusCells.first()).toBeVisible({ timeout: 5000 });

      // 4. Every visible status cell must say "Ausstehend"
      for (const cell of await statusCells.all()) {
        await expect(cell).toContainText("Ausstehend");
      }
    });

    test('shows only "Überfällig" invoices', async ({ page }) => {

      // 1. Wait for data
      const statusCells = page.getByTestId("invoices-row-status");
      await expect(statusCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Select Überfällig
      const trigger = page.getByTestId("invoices-filter-status-trigger");
      await trigger.click();
      await page.getByRole("option", { name: "Überfällig" }).click();

      // 3. Trigger now shows "Überfällig"
      await expect(trigger).toHaveText("Überfällig");

      // 4. Either all visible rows are "Überfällig" OR the empty state is shown
      // (page 1 may have no "Überfällig" invoices depending on data)
      const count = await statusCells.count();
      if (count > 0) {
        for (const cell of await statusCells.all()) {
          await expect(cell).toContainText("Überfällig");
        }
      } else {
        await expect(page.getByText("Keine Rechnungen gefunden.").filter({ visible: true })).toBeVisible();
      }
    });

  });

  test.describe("Reset filter", () => {

    test("should reset an active status filter", async ({ page }) => {

      // 1. Wait for data
      const statusCells = page.getByTestId("invoices-row-status");
      await expect(statusCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Activate status filter
      const trigger = page.getByTestId("invoices-filter-status-trigger");
      await trigger.click();
      await page.getByRole("option", { name: "Bezahlt" }).click();
      await expect(trigger).toHaveText("Bezahlt");

      // 3. Click the visible reset button
      const resetButton = page.getByTestId("invoices-reset-button").filter({ visible: true });
      await resetButton.click();

      // 4. Trigger must no longer show the selected value
      await expect(trigger).not.toHaveText("Bezahlt");
    });

    test("should clear search text when reset is clicked", async ({ page }) => {

      // 1. Wait for data
      const rows = page.locator("tbody tr");
      await expect(rows.first()).toBeVisible({ timeout: 10000 });

      // 2. Type search text
      const search = page.getByTestId("invoices-search-input");
      await search.click();
      await search.pressSequentially("testquery");
      await expect(search).toHaveValue("testquery", { timeout: 5000 });

      // 3. Click the visible reset button
      const resetButton = page.getByTestId("invoices-reset-button").filter({ visible: true });
      await resetButton.click();

      // 4. Search input must be empty
      await expect(search).toHaveValue("");
    });

  });

  test.describe("Combined filters", () => {

    test('status "Bezahlt" + search by customer shows only matching rows', async ({ page }) => {

      // 1. Wait for data
      const statusCells = page.getByTestId("invoices-row-status");
      await expect(statusCells.first()).toBeVisible({ timeout: 10000 });

      // 2. Apply "Bezahlt" filter
      const trigger = page.getByTestId("invoices-filter-status-trigger");
      await trigger.click();
      await page.getByRole("option", { name: "Bezahlt" }).click();
      await expect(statusCells.first()).toBeVisible({ timeout: 5000 });

      // 3. Capture the customer from the first visible "Bezahlt" row and search for it
      const rows = page.locator("tbody tr");
      const customer = await rows.first().locator("td").nth(3).textContent() ?? "";
      const search = page.getByTestId("invoices-search-input");
      await search.click();
      await search.pressSequentially(customer.trim());
      await expect(search).toHaveValue(customer.trim(), { timeout: 5000 });

      // 4. All remaining rows must be "Bezahlt" AND have that customer
      const allRows = await rows.all();
      expect(allRows.length).toBeGreaterThan(0);
      for (const row of allRows) {
        await expect(row.locator("td").nth(3)).toContainText(customer.trim());
        await expect(row.locator("[data-testid='invoices-row-status']")).toContainText("Bezahlt");
      }
    });

  });

});

// ── Pagination ────────────────────────────────────────────────────────────────

test.describe("Pagination", () => {

  test('"previous" button is disabled on page 1', async ({ page }) => {

    // 1. Wait for data
    const statusCells = page.getByTestId("invoices-row-status");
    await expect(statusCells.first()).toBeVisible({ timeout: 10000 });

    // 2. Prev button must be disabled on the first page
    const prevBtn = page.getByTestId("invoices-pagination-prev");
    await expect(prevBtn).toBeDisabled();
  });

  test("clicking \"next\" loads page 2 with different invoices", async ({ page }) => {

    // 1. Wait for data and record the first invoice ID on page 1
    const rows = page.locator("tbody tr");
    const statusCells = page.getByTestId("invoices-row-status");
    await expect(statusCells.first()).toBeVisible({ timeout: 10000 });
    const firstIdPage1 = await rows.first().locator("td").first().textContent();

    // 2. Navigate to page 2
    const nextBtn = page.getByTestId("invoices-pagination-next");
    await nextBtn.click();

    // 3. Table updates — first row ID is different on page 2
    await expect(rows.first().locator("td").first()).not.toHaveText(firstIdPage1 ?? "", { timeout: 10000 });
    await expect(statusCells.first()).toBeVisible();
  });

  test("clicking \"previous\" from page 2 returns to page 1", async ({ page }) => {

    // 1. Wait for data and record the first invoice ID on page 1
    const rows = page.locator("tbody tr");
    const statusCells = page.getByTestId("invoices-row-status");
    await expect(statusCells.first()).toBeVisible({ timeout: 10000 });
    const firstIdPage1 = await rows.first().locator("td").first().textContent();

    // 2. Navigate to page 2
    await page.getByTestId("invoices-pagination-next").click();
    await expect(rows.first().locator("td").first()).not.toHaveText(firstIdPage1 ?? "", { timeout: 10000 });

    // 3. Navigate back to page 1
    await page.getByTestId("invoices-pagination-prev").click();

    // 4. First invoice ID must match page 1 again
    await expect(rows.first().locator("td").first()).toHaveText(firstIdPage1 ?? "", { timeout: 10000 });
  });

  test('"next" button is disabled on the last page', async ({ page }) => {

    // 1. Wait for data
    const statusCells = page.getByTestId("invoices-row-status");
    await expect(statusCells.first()).toBeVisible({ timeout: 10000 });

    // 2. Navigate to the last page by clicking next until disabled
    const nextBtn = page.getByTestId("invoices-pagination-next");
    while (await nextBtn.isEnabled()) {
      await nextBtn.click();
      await page.waitForTimeout(300);
    }

    // 3. Next button must be disabled on the last page
    await expect(nextBtn).toBeDisabled();
  });

});
