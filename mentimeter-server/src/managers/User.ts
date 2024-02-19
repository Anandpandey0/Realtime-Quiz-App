// user.ts
import { v4 as uuidv4 } from "uuid";

export class User {
  private id: string;
  private name: string;
  private email: string;
  private password: string;

  constructor(name: string, email: string, password: string) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
  }

  changePassword(newPassword: string) {
    this.password = newPassword;
  }

  displayUserInfo(): void {
    console.log(
      `User ID: ${this.id}, Name: ${this.name}, Email: ${this.email}`
    );
  }

  getPassword(): string {
    return this.password;
  }
  getEmail(): string {
    return this.email;
  }
}
