import { Page } from "@playwright/test";

export default class TodoPage {
  async load(page: Page) {
    await page.goto("/todo");
  }

  private get deleteIcon() {
    return "[data-testid=delete]";
  }

  private get noTodos() {
    return "[data-testid=no-todos]";
  }

  private get todoItem() {
    return "[data-testid=todo-item]";
  }

  private get welcomeMessage() {
    return "[data-testid=welcome]";
  }

  getWelcomeMessageElement(page: Page) {
    return page.locator(this.welcomeMessage);
  }

  async deleteTodo(page: Page) {
    await page.click(this.deleteIcon);
  }

  async getNoTodosMessage(page: Page) {
    return page.locator(this.noTodos);
  }

  async getTodoItem(page: Page) {
    return page.locator(this.todoItem);
  }
}
