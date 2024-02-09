import { test, expect } from "@playwright/test";
test("should be able to register in our app", async ({ page }) => {
  await page.goto("https://todo.qacart.com/signup");
  await page.type("[data-testid=first-name]", "QAart");
  await page.type("[data-testid=last-name]", "last");
  await page.type("[data-testid=email]", "test@here.com");
  await page.type("[data-testid=password]", "Password1!");
  await page.type("[data-testid=confirm-password]", "Password1!");
  await page.click("[data-testid=submit]");
  const welcomeMessage = page.locator("[data-testid=welcome]");
  await expect(welcomeMessage).toBeVisible();
});
