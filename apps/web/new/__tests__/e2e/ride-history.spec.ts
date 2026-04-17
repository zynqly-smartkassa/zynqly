import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/account`);
  await expect(page).toHaveURL(`${baseURL}/account`);
})

test('Successful edit of the account', async ({ page, baseURL }) => {

  

  
})