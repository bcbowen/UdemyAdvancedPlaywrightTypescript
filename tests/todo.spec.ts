import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import User from "../models/User";

test("Should be able to add new todo", async ({ page, request, context }) => {
  const user = new User(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    "Password1!"
  );

  const response = await request.post("/api/v1/users/register", {
    data: {
      email: user.getEmail(),
      password: user.getPassword(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
    },
  });

  const responseBody = await response.json();
  const accessToken = responseBody.access_token;
  const firstName = responseBody.firstName;
  const userId = responseBody.userID;

  await context.addCookies([
    {
      name: "access_token",
      value: accessToken,
      url: "https://todo.qacart.com",
    },
    {
      name: "firstName",
      value: firstName,
      url: "https://todo.qacart.com",
    },
    {
      name: "userID",
      value: userId,
      url: "https://todo.qacart.com",
    },
  ]);

  await page.goto("/todo/new");
  await page.click("data-testid=add");
  await page.type("[data-testid=new-todo]", "Get Bent!");
  await page.click("[data-testid=submit-newTask]");
  const todoItem = page.locator("[data-testid=todo-item]");
  expect(await todoItem.textContent()).toEqual("Get Bent!");
});

test("Should be able to delete todo", async ({ page, request, context }) => {
  await page.goto("signup");

  const user = new User(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    "Password1!"
  );

  const response = await request.post("/api/v1/users/register", {
    data: {
      email: user.getEmail(),
      password: user.getPassword(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
    },
  });

  const responseBody = await response.json();
  const accessToken = responseBody.access_token;
  const firstName = responseBody.firstName;
  const userId = responseBody.userID;

  await context.addCookies([
    {
      name: "access_token",
      value: accessToken,
      url: "https://todo.qacart.com",
    },
    {
      name: "firstName",
      value: firstName,
      url: "https://todo.qacart.com",
    },
    {
      name: "userID",
      value: userId,
      url: "https://todo.qacart.com",
    },
  ]);

  /*
  await page.type("[data-testid=first-name]", faker.person.firstName());
  await page.type("[data-testid=last-name]", faker.person.lastName());
  await page.type("[data-testid=email]", faker.internet.email());
  await page.type("[data-testid=password]", "Password1!");
  await page.type("[data-testid=confirm-password]", "Password1!");
  await page.click("[data-testid=submit]");
  const welcomeMessage = page.locator("[data-testid=welcome]");
  await expect(welcomeMessage).toBeVisible();await page.click("data-testid=add");
  */
  await request.post("/api/v1/tasks", {
    data: {
      isCompleted: false,
      item: "Get Bent!",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  /*
  await page.goto("/todo/new");
  await page.type("[data-testid=new-todo]", "Get Bent!");
  */
  await page.goto("/todo");
  await page.click("[data-testid=delete]");
  const noTodosMessage = page.locator("[data-testid=no-todos]");
  await expect(noTodosMessage).toBeVisible();
});
