import { APIRequestContext } from "@playwright/test";
import User from "../models/User";

export default class TodoApi {
  static async addTodo(request: APIRequestContext, user: User, item: string) {
    /*
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
*/
    await request.post("/api/v1/tasks", {
      data: {
        isCompleted: false,
        item: item,
      },
      headers: {
        //Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
