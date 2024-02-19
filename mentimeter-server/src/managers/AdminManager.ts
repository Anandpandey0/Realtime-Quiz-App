import QuizModel, { Quiz } from "../models/quizModel";
import UserModel from "../models/userModel";
import { QuizManager } from "./QuizManager";
import { UserManager } from "./UserManager";

export class AdminManager extends UserManager {
  private quizManager: QuizManager;

  constructor() {
    super();
    this.quizManager = new QuizManager();
  }

  // Special function exclusive to AdminManager
  async getAllQuizzes(): Promise<Quiz[]> {
    try {
      // Assuming QuizModel is your Mongoose model for quizzes
      const quizzDB = await QuizModel.find();
      return quizzDB;
    } catch (error) {
      // Handle any errors
      console.error("Error fetching quizzes:", error);
      throw error; // or handle more gracefully
    }
  }
  async getAllUsersDb() {
    try {
      // Assuming QuizModel is your Mongoose model for quizzes
      const userDb = await UserModel.find();
      return userDb;
    } catch (error) {
      // Handle any errors
      console.error("Error fetching quizzes:", error);
      throw error; // or handle more gracefully
    }
  }
}
