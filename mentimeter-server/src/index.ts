import express from "express";
import { connectDB } from "./utils/connectDB";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import quizRoutes from "./routes/quizRoutes";
import adminRoutes from "./routes/adminRoutes";
var cors = require("cors");

const app = express();
const port = 3000;
dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

//Connect MongoDB
connectDB();
app.use("/user", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/admin", adminRoutes);
// const userManager = new UserManager();
// const name = "Testing User";
// const email = "test@test.com";
// const password = "test";

// // Register the user
// userManager.registerUser(name, email, password).then((newUser) => {
//   console.log(
//     `User ${newUser.name} registered successfully with email: ${newUser.email}`
//   );
// });

// createQuiz();
