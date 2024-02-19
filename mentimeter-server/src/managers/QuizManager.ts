import QuizModel, { Question, Quiz } from "../models/quizModel";
import UserModel from "../models/userModel";
import { UserManager } from "./UserManager";
interface QuizAndQuestion {
  quiz: Quiz | null;
  question: Question | null;
}

export class QuizManager {
  private userManager: UserManager;

  constructor(email: string | null = null) {
    this.userManager = new UserManager();
  }
  async isOwner(quizId: string, userId: string) {
    const userInfo = await this.userManager.findUserInfoByID(userId);
    if (!userInfo) return false;
    const quizInfo = await QuizModel.findById(quizId);
    if (!quizInfo) return false;
    return true;
  }
  async createQuiz(userId: string): Promise<Quiz | Boolean> {
    try {
      const user = await this.userManager.findUserInfoByID(userId);
      if (!user) {
        console.log(`User with ${userId} not found`);
        return false;
      }
      const newQuiz = new QuizModel({
        owner: user._id,
        questions: [],
        created_at: new Date(),
        updated_at: new Date(),
      });
      await newQuiz.save();
      console.log("Quiz created successfully.");
      return newQuiz;
    } catch (error) {
      console.error("Error creating quiz:", error);
      return false;
    }
  }
  async getAllOwnedQuizzes(userId: string) {
    try {
      const user = await this.userManager.findUserInfoByID(userId);
      if (!user) {
        console.log(`No user found with email ${userId} in database`);
        return;
      }
      const quizzDB = await QuizModel.find({ owner: user._id }).exec();
      if (quizzDB) {
        console.log("Quizzes found");
        return quizzDB;
      }

      console.log(`No Quiz found by ${userId}`);
      return [];
    } catch (error) {
      console.error("Internal Server Error ", error);
      return new Error(`"Internal Server Error "`);
    }
  }
  async getQuizById(quizId: string, userId: string) {
    const ownerStatus = await this.isOwner(quizId, userId);
    if (!ownerStatus) {
      console.log("You are not the owner");
      return false;
    }

    const quiz = await QuizModel.findById(quizId);
    if (!quiz) {
      console.log(`No quiz found with the given id ${quizId}`);
      return false;
    }
    return quiz;
  }
  async addQuestionToQuiz(
    quizId: string,
    question: Question[],
    userId: string
  ) {
    try {
      const quiz = await this.getQuizById(quizId, userId);
      if (!quiz) {
        console.log(`No quiz found with the given id ${quizId}`);
        return false;
      }
      quiz.questions.push(...question);
      quiz.updated_at = new Date();
      await quiz.save();
      console.log(`Added question successfully into the quiz database`);
      return quiz;
    } catch (error) {
      console.error("Internal Server error");
      return false;
    }
  }

  async deleteQuizById(quizId: string, userId: string) {
    const quizInfo = await this.getQuizById(quizId, userId);
    if (!quizInfo) {
      console.log(`Wrong credentials or no quiz found by the given id`);
      return false;
    }
    const deletedQuiz = await QuizModel.findByIdAndDelete(quizId);
    console.log("Successfully deleted the quiz ", deletedQuiz);
    return true;
  }
  async deleteQuesById(quizId: string, quesId: string, userId: string) {
    try {
      const quizInfo = await this.getQuizById(quizId, userId);
      if (!quizInfo) return false;
      let questionInfo = quizInfo.questions;
      questionInfo = questionInfo.filter(
        (question) => question._id?.toString() !== quesId
      );
      quizInfo.questions = questionInfo;
      // Update the `updated_at` field
      quizInfo.updated_at = new Date();
      await quizInfo.save();

      console.log("Successfully deleted the question from the quiz");
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  async editQuiz(quizId: string, updatedQuiz: any, userId: string) {
    const quizInfo = await this.getQuizById(quizId, userId);
    if (!quizInfo) {
      console.log("Wrong credentials or no quiz found by the given id");
      return false;
    }
    const result = await QuizModel.findByIdAndUpdate(quizId, updatedQuiz, {
      new: true,
    });
    if (!result) {
      console.log("No quiz found");
      return false;
    }
    console.log("Successfully updated the quiz ");
    return result;
  }

  //Edit Quiz Question
  async getQuestionById(quizId: string, userId: string, quesId: string) {
    try {
      const quiz = await this.getQuizById(quizId, userId);
      if (!quiz) {
        console.log("No quiz found with the given ID");
        return null;
      }

      // Find the question with the specified ID
      const question = quiz.questions.find((q) => q._id?.toString() === quesId);
      if (!question) {
        console.log("No question found with the given ID");
        return null;
      }

      return { quiz, question };
    } catch (error) {
      console.error("Error retrieving question:", error);
      return null;
    }
  }

  async editQuestionById(
    quizId: string,
    userId: string,
    quesId: string,
    updatedQuestion: any
  ): Promise<QuizAndQuestion> {
    try {
      const result = await this.getQuestionById(quizId, userId, quesId);
      const { quiz, question } = result ?? { quiz: null, question: null };
      if (!quiz) {
        console.log("No Quiz found with this ID");
        return { quiz: null, question: null };
      }
      if (!question) {
        console.log("No question found with the given ID");
        return { quiz: quiz, question: null };
      }

      // Update the question properties with the provided data
      question.title = updatedQuestion.title || question.title;
      question.options = updatedQuestion.options || question.options;
      quiz.updated_at = new Date();

      // Save the updated question
      await quiz.save();

      console.log("Question updated successfully");
      return { quiz: quiz, question: question };
    } catch (error) {
      console.error("Error updating question:", error);
      return { quiz: null, question: null };
    }
  }
}
