import { test, expect } from "@playwright/test";
import SignupPage from "../pages/SignupPage";
import TodoPage from "../pages/TodoPage";
import User from "../models/User";

test("should be able to register in our app", async ({ page }) => {
  const user: User = User.getUser();
  const signupPage = new SignupPage();
  await signupPage.load(page);
  await signupPage.signup(page, user);
  const todoPage = new TodoPage();
  const welcomeMessage = todoPage.getWelcomeMessageElement(page);
  await expect(welcomeMessage).toBeVisible();
});
