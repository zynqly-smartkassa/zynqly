import { test, expect } from "@playwright/test";
import { getTestData } from "./utils/getTestData";

test.describe("Already signed-in", () => {
  test("should not sign up the user, because the user has an account", async ({
    page,
    baseURL,
    browserName,
  }) => {
    // 1. Go to Sign up route, expect redirection since we have an account

    await page.goto(`${baseURL}/sign-up`);

    // 2. Expect route to be dashboard

    await expect(page).toHaveURL(`${baseURL}/dashboard`, { timeout: 5000 });

    // 2. Sign out the account

    await page.getByTestId("header-menu-trigger").click();
    await page.getByTestId("header-sign-out-button").click();

    await expect(page).toHaveURL(`${baseURL}/`);

    await page.getByTestId("landing-get-started-link").click();

    await expect(page).toHaveURL(`${baseURL}/sign-up`);

    // 3. Try to sign up the account again, error

    const { name, email, phone, password } = getTestData(browserName, "unique");

    await page.getByTestId("sign-up-name-input").fill(name);
    await page.getByTestId("sign-up-email-input").fill(email);
    await page.getByTestId("sign-up-phone-input").fill(phone);
    await page.getByTestId("sign-up-password-input").fill(password);

    await page.getByTestId("sign-up-terms-checkbox").check();
    await page.getByTestId("sign-up-submit-button").click();

    await expect(page.locator(".toast-error")).toBeVisible({ timeout: 5000 });

    // 4. Go to sign in and try to sign in the account

    await page.getByTestId("sign-up-sign-in-link").click();

    await expect(page).toHaveURL(`${baseURL}/sign-in`);

    await page.getByTestId("sign-in-email-input").fill(email);
    await page.getByTestId("sign-in-password-input").fill(password);

    await page.getByTestId("sign-in-submit-button").click();

    await expect(page.locator(".toast-success")).toBeVisible({ timeout: 5000 });
  });

  test("trigger unique constraints in sign-up", async ({
    page,
    baseURL,
    browserName,
  }) => {
    // 1. Go to Sign up route, expect redirection since we have an account

    await page.goto(`${baseURL}/sign-up`);

    // 2. Expect route to be dashboard

    await expect(page).toHaveURL(`${baseURL}/dashboard`, { timeout: 5000 });

    // 2. Sign out the account

    await page.getByTestId("header-menu-trigger").click();
    await page.getByTestId("header-sign-out-button").click();

    await expect(page).toHaveURL(`${baseURL}/`);

    await page.getByTestId("landing-get-started-link").click();

    await expect(page).toHaveURL(`${baseURL}/sign-up`);

    // 3. Try to sign up the account again, error

    const { name, email, phone, password } = getTestData(browserName, "unique");

    await page.getByTestId("sign-up-name-input").fill(name);
    await page.getByTestId("sign-up-email-input").fill(email);
    await page.getByTestId("sign-up-phone-input").fill(phone);
    await page.getByTestId("sign-up-password-input").fill(password);

    await page.getByTestId("sign-up-terms-checkbox").check();
    await page.getByTestId("sign-up-submit-button").click();

    await expect(page.locator(".toast-error")).toBeVisible({ timeout: 5000 });

    // 4. Unique Constraints errors

    await expect(page.getByTestId("sign-up-email-error")).toBeVisible();
    await expect(page.getByTestId("sign-up-phone-error")).toBeVisible();

    // 5. Fill unique values
    await page.getByTestId("sign-up-email-input").fill(email + "Unique");
    await page.getByTestId("sign-up-phone-input").fill(phone.slice(0, 13));

    // 6. Errors should vanish

    await expect(page.getByTestId("sign-up-email-error")).not.toBeVisible();
    await expect(page.getByTestId("sign-up-phone-error")).not.toBeVisible();

    await page.getByTestId("sign-up-submit-button").click();

    await expect(page.locator(".toast-success")).toBeVisible({ timeout: 5000 });
  });

  test("should sign-in correctly", async ({ page, baseURL, browserName }) => {
    // 1. Go to Sign up route, expect redirection since we have an account

    await page.goto(`${baseURL}/sign-in`);

    // 2. Expect route to be dashboard

    await expect(page).toHaveURL(`${baseURL}/dashboard`, { timeout: 5000 });

    // 2. Sign out the account

    await page.getByTestId("header-menu-trigger").click();
    await page.getByTestId("header-sign-out-button").click();

    await expect(page).toHaveURL(`${baseURL}/`);

    await page.getByTestId("landing-sign-in-link").click();

    await expect(page).toHaveURL(`${baseURL}/sign-in`);

    // 3. Try to sign in the account

    const { email, password } = getTestData(browserName, "unique");

    await page.getByTestId("sign-in-email-input").fill(email);
    await page.getByTestId("sign-in-password-input").fill(password);

    await page.getByTestId("sign-in-submit-button").click();

    await expect(page.locator(".toast-success")).toBeVisible({ timeout: 5000 });
  });

  test("trigger unique constraints in sign-in", async ({
    page,
    baseURL,
    browserName,
  }) => {
    // 1. Go to Sign up route, expect redirection since we have an account

    await page.goto(`${baseURL}/sign-in`);

    // 2. Expect route to be dashboard

    await expect(page).toHaveURL(`${baseURL}/dashboard`, { timeout: 5000 });

    // 2. Sign out the account

    await page.getByTestId("header-menu-trigger").click();
    await page.getByTestId("header-sign-out-button").click();

    await expect(page).toHaveURL(`${baseURL}/`);

    await page.getByTestId("landing-sign-in-link").click();

    await expect(page).toHaveURL(`${baseURL}/sign-in`);

    // 3. Try to sign in the account

    const { email, password } = getTestData(browserName, "unique");

    await page.getByTestId("sign-in-email-input").fill("notExisting" + email);
    await page.getByTestId("sign-in-password-input").fill("notExisting" + password);

    await page.getByTestId("sign-in-submit-button").click();

    await expect(page.locator(".toast-error")).toBeVisible({ timeout: 5000 });

    // 4. Unique Constraints errors should be visible in login
    // This will check if the backend doesnt accidentaly give a detailed error reply on fields

    await expect(page.getByTestId("sign-in-email-error")).not.toBeVisible();
    await expect(page.getByTestId("sign-in-password-error")).not.toBeVisible();

    // 5. Fill correct values
    await page.getByTestId("sign-in-email-input").clear();
    await page.getByTestId("sign-in-email-input").fill(email);
    await page.getByTestId("sign-in-password-input").clear();
    await page.getByTestId("sign-in-password-input").fill(password);

    // 6. successful
    await page.getByTestId("sign-in-submit-button").click();

    await expect(page.locator(".toast-success")).toBeVisible({ timeout: 5000 });
  });
});
