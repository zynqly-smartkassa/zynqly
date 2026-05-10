/**
 * Pre-authenticates Playwright browsers by provisioning a dedicated account and
 * persisting its storage state to disk. Other specs pass their own
 * {@code uniqueIdentifier} to {@link getTestData} so they do not collide with
 * this bootstrap user.
 */
import { test as setup, expect } from "@playwright/test";
import { getTestData } from "../utils/getTestData";

const authFile = (browserName: string) =>
  `playwright/.auth/${browserName}.json`;

setup("authenticate", async ({ page, baseURL, browserName }) => {
  const { name, email, phone, password } = getTestData(browserName, "unique");

  await page.goto(`${baseURL}/sign-up`);
  await expect(page).toHaveURL(`${baseURL}/sign-up`);

  await page.getByTestId("sign-up-name-input").fill(name);
  await page.getByTestId("sign-up-email-input").fill(email);
  await page.getByTestId("sign-up-phone-input").fill(phone);
  await page.getByTestId("sign-up-password-input").fill(password);

  await page.getByTestId("sign-up-terms-checkbox").check();
  await page.getByTestId("sign-up-submit-button").click();

  await expect(page.locator(".toast-success")).toBeVisible();

  // Only save the authFile if it is the mainUser
  await page.context().storageState({ path: authFile(browserName) });
});
