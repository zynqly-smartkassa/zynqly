import { test, expect } from "@playwright/test";
import { getTestData } from "./utils/getTestData";

test.describe("Already signed-in", () => {
  test("should not sign up the user, because the user has an account", async ({
    page,
    baseURL,
    browserName
  }) => {
    // 1. Go to Sign up route, expect redirection since we have an account

    await page.goto(`${baseURL}/sign-up`);

    // 2. Expect route to be dashboard

    await expect(page).toHaveURL(`${baseURL}/dashboard`, { timeout: 5000 });

    // 2. Sign out the account

    await page.getByTestId("menu").click();
    await page.getByTestId("sign-out-button").click();

    await expect(page).toHaveURL(`${baseURL}/`);

    await page.getByTestId("get-started").click();

    await expect(page).toHaveURL(`${baseURL}/sign-up`);

    // 3. Try to sign up the account again, error

    const { name, email, phone, password } = getTestData(browserName, "unique");

    await page.getByTestId("name-field").fill(name);
    await page.getByTestId("email-field").fill(email);
    await page.getByTestId("phone-field").fill(phone);
    await page.getByTestId("password-field").fill(password);

    await page.getByTestId("terms-checkbox").check();
    await page.getByTestId("sign-up-button").click();

    await expect(page.locator(".toast-error")).toBeVisible();

    // 4. Go to sign in and try to sign in the account

    await page.getByTestId("sign-in-link").click();

    await expect(page).toHaveURL(`${baseURL}/sign-in`);

    await page.getByTestId("email-field").fill(email);
    await page.getByTestId("password-field").fill(password);

    await page.getByTestId("sign-in-button").click();

    await expect(page.locator(".toast-success")).toBeVisible({ timeout: 5000 });
  });
});
