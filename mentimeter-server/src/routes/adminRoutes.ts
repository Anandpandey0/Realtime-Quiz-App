import express, { Request, Response } from "express";

import { AdminManager } from "../managers/AdminManager";
const router = express.Router();
const adminManager = new AdminManager();

router.get("/", (req, res) => {
  res.send("Hello to admin Router");
});

router.get("/userDb", async (req, res) => {
  const usersDb = await adminManager.getAllUsersDb();
  res.json(usersDb);
});
router.get("/quizDb", async (req, res) => {
  const quizDb = await adminManager.getAllQuizzes();
  res.json(quizDb);
});

export default router;
