import UserModel, { User } from "../models/userModel";
import bcrypt from "bcrypt";
export class UserManager {
  async registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    return newUser;
  }
  async findUserByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }).exec();
  }
  async findUserInfoByID(id: string) {
    return UserModel.findById(id).exec();
  }

  async signIn(email: string, password: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        console.log(`User with email ${email} signed in.`);
        return user._id;
      } else {
        console.log("Wrong Credentials");
        return false;
      }
    } else {
      console.log(`User with email ${email} not found.`);
      return false;
    }
  }
  async changePassword(email: string, newPassword: string): Promise<void> {
    const user = await this.findUserByEmail(email);
    if (user) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      console.log("Password Changed");
    } else {
      console.log("No users found");
    }
  }
}
