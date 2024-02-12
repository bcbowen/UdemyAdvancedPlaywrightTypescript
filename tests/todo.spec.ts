import { test, expect } from "@playwright/test";

import User from "../models/User";
import SignupPage from "../pages/SignupPage";
import TodoPage from "../pages/TodoPage";
import NewTodoPage from "../pages/NewTodoPage";

test("Should be able to add new todo", async ({ page, request, context }) => {
  const user = User.getUser();
  const signupPage = new SignupPage();
  await signupPage.apiSignup(request, user, context);

  const todoPage = new TodoPage();
  const newTodoPage = new NewTodoPage();
  await newTodoPage.load(page);
  const item = "Get Bent!";
  await newTodoPage.addTodo(page, item);

  const todoItem = await todoPage.getTodoItem(page);
  expect(await todoItem.textContent()).toEqual(item);
});

test("Should be able to delete todo", async ({ page, request, context }) => {
  const user = User.getUser();

  const signupPage = new SignupPage();
  await signupPage.apiSignup(request, user, context);

  const newTodoPage = new NewTodoPage();
  await newTodoPage.addTodoViaApi(request, user);

  const todoPage = new TodoPage();
  await todoPage.load(page);
  await todoPage.deleteTodo(page);

  const noTodosMessage = await todoPage.getNoTodosMessage(page);

  await expect(noTodosMessage).toBeVisible();
});
