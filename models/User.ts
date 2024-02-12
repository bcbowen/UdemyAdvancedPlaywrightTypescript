import { faker } from "@faker-js/faker";

export default class User {
  private firstName: string;
  private lastName: string;
  private email: string;

  private password: string;
  private accessToken: string;
  private userId: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  getFirstName() {
    return this.firstName;
  }
  getLastName() {
    return this.lastName;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  getUserId() {
    return this.userId;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  static getUser(): User {
    return new User(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.internet.email(),
      "Password1!"
    );
  }
}
