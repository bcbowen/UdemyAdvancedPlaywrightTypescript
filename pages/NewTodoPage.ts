import { APIRequestContext, Page } from "@playwright/test";
import User from "../models/User";

export default class NewTodoPage {
  async load(page: Page) {
    await page.goto("/todo/new");
  }

  private get newTodoInput() {
    return "[data-testid=new-todo]";
  }

  private get newTodoSubmit() {
    return "[data-testid=submit-newTask]";
  }

  async addTodoViaApi(request: APIRequestContext, user: User) {}

  async addTodo(page: Page, task: string) {
    await page.type(this.newTodoInput, task);
    await page.click(this.newTodoSubmit);
  }
}
