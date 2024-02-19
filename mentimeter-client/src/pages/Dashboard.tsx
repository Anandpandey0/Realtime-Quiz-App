/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getUserId } from "../utils/cookiesUtils";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  createNewQuiz,
  deleteQuizById,
  fetchDashboard,
} from "../utils/helperFunctions";
import Box from "../components/Box";

const Dashboard = () => {
  const [quizDB, setQuizDB] = useState([]);
  const userId = getUserId();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
    getUserOwnedQuizDb();
  }, []);
  // console.log(userId);
  async function getUserOwnedQuizDb() {
    const quizes = await fetchDashboard(userId);
    setQuizDB(quizes);
  }
  const addNewQuiz = async () => {
    const addNewQuizHandler = await createNewQuiz(userId);
    if (addNewQuizHandler) {
      getUserOwnedQuizDb();
    }
  };
  const deleteQuiz = async (quizId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?"
    );
    if (confirmDelete) {
      const deleteQuizByIdHandler = await deleteQuizById(userId, quizId);
      if (deleteQuizByIdHandler) {
        getUserOwnedQuizDb();
      }
    }
  };
  return (
    <div>
      <h1>Dashboard</h1>
      Owned Quiz Databases
      {quizDB.length > 0 &&
        quizDB.map((quiz, index) => (
          <Box title={quiz.title} date={Date.now()} key={index + 1} />
        ))}
      <button onClick={addNewQuiz}>Add</button>
    </div>
  );
};

export default Dashboard;

{
  /* <div key={index + 1} className="flex w-64 justify-between my-4">
            <h1>{quiz.title}</h1>
            <button
              onClick={() => navigate(`/edit/${quiz._id}`)}
              className="w-fit bg-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => deleteQuiz(quiz._id)}
              className="w-fit bg-red-500"
            >
              Delete
            </button>
          </div> */
}
