import axios from "axios";

//Get dashboard
export async function fetchDashboard(userId: string) {
  try {
    const response = await axios.get(`http://localhost:3000/quiz/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Some Error occured while fetching dashboard", error);
    throw error;
  }
}
//Fetch Quiz Data
export async function fetchQuizInfo(quizId: string, userId: string) {
  try {
    const response = await axios.get(
      `http://localhost:3000/quiz/${userId}/get/${quizId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error fetching quiz data ", error);
    throw error;
  }
}

//Add new quiz (Admin users only )

export async function createNewQuiz(userId: string) {
  try {
    const response = await axios.post(
      `http://localhost:3000/quiz/${userId}/create`
    );
    return response.data;
  } catch (error) {
    console.error("Error occured while adding new Quiz", error);
    throw error;
  }
}
//Delete a quiz api handler
export async function deleteQuizById(userId: string, quizId: string) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/quiz/${userId}/delete/${quizId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error occured while hitting the api", error);
    throw error;
  }
}
export async function changeTitleHandler(
  userId: string,
  quizId: string,
  title: string
) {
  try {
    const response = await axios.post(
      ` http://localhost:3000/quiz/${userId}/edit/${quizId}`,
      {
        title,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error occured while hitting the Change Title Api", error);
    throw error;
  }
}
export async function fetch() {
  try {
    const response = await axios.get(``);
    return response.data;
  } catch (error) {
    console.error("Error occured while hitting the api", error);
    throw error;
  }
}
// export async function name() {
//   try {
//     const response = await axios.get(``);
//     return response.data;
//   } catch (error) {
//     console.error("Error occured while hitting the api", error);
//     throw error;
//   }
// }
