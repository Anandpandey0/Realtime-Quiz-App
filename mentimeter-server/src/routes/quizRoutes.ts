import express, { Request, Response } from "express";

import { QuizManager } from "../managers/QuizManager";
const router = express.Router();
const quizManager = new QuizManager();

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  // console.log(userId);
  const quizzes = await quizManager.getAllOwnedQuizzes(userId);
  res.json(quizzes);
});
//Get Particular Quiz by ID
router.get("/:userId/get/:quizId", async (req, res) => {
  const quizId = req.params.quizId;
  const { userId } = req.params;
  // console.log(quizId);
  const quiz = await quizManager.getQuizById(quizId, userId);
  res.json(quiz);
});

//Update Particular quiz via ID
router.post("/:userId/edit/:quizId", async (req, res) => {
  const quizId = req.params.quizId;
  const userId = req.params.userId;
  const updatedFields = req.body;

  // console.log(quizId);
  const result = await quizManager.editQuiz(quizId, updatedFields, userId);
  res.json(result);
});
//Create Quiz
router.post("/:userId/create", async (req, res) => {
  const { userId } = req.params;
  const newQuiz = await quizManager.createQuiz(userId);
  res.json(newQuiz);
});

//Delete a Quiz by Id
router.delete("/:userId/delete/:quizId", async (req, res) => {
  const { quizId } = req.params;
  const { userId } = req.params;
  // console.log(quizId, userId
  try {
    if (!userId) {
      res.json({
        message: "Invalid credentials , Try LogIn again",
      });
      return;
    }
    if (!quizId) {
      res.json({
        message: "Invalid Quiz Id , Try again",
      });
      return;
    }
    // console.log(quizId);
    const deleteQuiz = await quizManager.deleteQuizById(quizId, userId);

    res.json(deleteQuiz);
    return;
  } catch (error) {
    console.error(error);
  }
});

router.post("/:userId/addQuestion/:quizId", async (req, res) => {
  const { userId, quizId } = req.params;
  const question = req.body;
  try {
    const result = await quizManager.addQuestionToQuiz(
      quizId,
      question,
      userId
    );
    res.json(result);
  } catch (error) {
    console.error("Error adding question to quiz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Delete a question by ID
router.delete("/:userId/get/:quizId/delete/:questionId", async (req, res) => {
  const { userId, quizId, questionId } = req.params;
  try {
    const deleteQuestion = await quizManager.deleteQuesById(
      quizId,
      questionId,
      userId
    );
    if (deleteQuestion) {
      // console.log("Deleted", deleteQuestion);
      res.json({ message: "Deleted Successfully", status: true });
      return;
    }
    res.json({
      message: "No question found  or wrong credentials ",
      status: false,
    });
    return;
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal server error ", status: false });
    return;
  }
});

//Get a Question By id ;
router.get("/:userId/get/:quizId/get/:quesId", async (req, res) => {
  const { userId, quizId, quesId } = req.params;
  try {
    const quesInfo = await quizManager.getQuestionById(quizId, userId, quesId);
    if (quesInfo) {
      res.json(quesInfo.question);
    } else {
      res.json({
        status: false,
        message: "No Question Found By this id",
      });
    }
  } catch (error) {
    res.send(false);
  }
});
// Edit a Question BY Id;

router.patch("/:userId/get/:quizId/edit/:quesId", async (req, res) => {
  const { userId, quizId, quesId } = req.params;
  const updatedFields = req.body;
  try {
    const success = await quizManager.editQuestionById(
      quizId,
      userId,
      quesId,
      updatedFields
    );
    if (success) {
      res.status(200).json({
        message: "Question updated successfully",
        updatedQuestion: success.question,
      });
    } else {
      res
        .status(404)
        .json({ message: "Question not found or unable to update" });
    }
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
