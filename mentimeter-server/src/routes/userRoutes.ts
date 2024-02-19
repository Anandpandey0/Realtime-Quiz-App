import express, { Request, Response } from "express";
import { UserManager } from "../managers/UserManager";
const router = express.Router();
const userManager = new UserManager();

router.get("/", (req, res) => {
  res.send("Helo to user Router");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await userManager.registerUser(name, email, password);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro while registering user", error);
    return res.status(500).json({
      error: "Interal Server Error",
    });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginStatus = await userManager.signIn(email, password);
    return res.status(201).json(loginStatus);
  } catch (error) {
    console.error("Erro while registering user", error);
    return res.status(500).json({
      error: "Interal Server Error",
    });
  }
});

export default router;
