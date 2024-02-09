import { test, expect } from "@playwright/test";

test("Should be able to add new todo", async ({ page }) => {
  await page.goto("https://todo.qacart.com/signup");
  await page.type("[data-testid=first-name]", "QAart");
  await page.type("[data-testid=last-name]", "last");
  await page.type("[data-testid=email]", "test2@here.com");
  await page.type("[data-testid=password]", "Password1!");
  await page.type("[data-testid=confirm-password]", "Password1!");
  await page.click("[data-testid=submit]");
  const welcomeMessage = page.locator("[data-testid=welcome]");
  await expect(welcomeMessage).toBeVisible();
  await page.click("data-testid=add");
  await page.type("[data-testid=new-todo]", "Get Bent!");
  await page.click("[data-testid=submit-newTask]");
  const todoItem = page.locator("[data-testid=todo-item]");
  expect(await todoItem.textContent()).toEqual("Get Bent!");
});

test("Should be able to delete todo", async ({ page }) => {
  await page.goto("https://todo.qacart.com/signup");
  await page.type("[data-testid=first-name]", "QAart");
  await page.type("[data-testid=last-name]", "last");
  await page.type("[data-testid=email]", "test3@here.com");
  await page.type("[data-testid=password]", "Password1!");
  await page.type("[data-testid=confirm-password]", "Password1!");
  await page.click("[data-testid=submit]");
  const welcomeMessage = page.locator("[data-testid=welcome]");
  await expect(welcomeMessage).toBeVisible();
  await page.click("data-testid=add");
  await page.type("[data-testid=new-todo]", "Get Bent!");
  await page.click("[data-testid=submit-delete]");
  const noTodosMessage = page.locator("[data-testid=no-todos]");
  await expect(noTodosMessage).toBeVisible();
});
