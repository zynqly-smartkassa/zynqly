import { test, expect } from "@playwright/test";

test.describe("sign-up", () => {
  test("should sign up the user", async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/sign-up`);
    await expect(page).toHaveURL(`${baseURL}/sign-up`);

    await page.getByTestId("name-field").fill("kaya");
    await page.getByTestId("email-field").fill("kaya@mail.com");
    await page.getByTestId("phone-field").fill("+43682322324123");
    await page.getByTestId("password-field").fill("Kaya+1234");

    await expect(page.getByTestId("name-field")).toHaveValue("kaya");

    await page.getByTestId("terms-checkbox").check();
    await page.getByTestId("register-button").click();

    const successToast = page.locator(".toast-success");
    await expect(successToast).toBeVisible({ timeout: 5000 });
  });
});
