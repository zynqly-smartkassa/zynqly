import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/dashboard`);
});

test("", async ({ page, baseURL }) => {
  await expect(page).toHaveURL(`${baseURL}/dashboard`);
});
