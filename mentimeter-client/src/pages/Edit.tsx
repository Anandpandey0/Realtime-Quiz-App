import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserId } from "../utils/cookiesUtils";
import axios from "axios";
import AddQuestionComponent from "../components/addQuestionComponent";
import EditQuestionComponent from "../components/editQuestionComponent";
import { changeTitleHandler, fetchQuizInfo } from "../utils/helperFunctions";

const Edit = () => {
  const { quizId } = useParams();
  const userId = getUserId();
  const [isLoading, setIsLoading] = useState(true);
  const [titleChange, setTitleChange] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [title, setTitle] = useState("");
  const [quizInfo, setQuizInfo] = useState({
    _id: "",
    owner: "",
    title: "",
    questions: [],
  });
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    getQuizInfo();
  }, []);

  async function getQuizInfo() {
    setIsLoading(true);
    try {
      const quizInfoResponse = await fetchQuizInfo(quizId, userId);
      setQuizInfo(quizInfoResponse);
      setTitle(quizInfoResponse.title);
    } catch (error) {
      console.error("Error fetching quiz info:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleQuestionAdded = async () => {
    setIsLoading(true);
    await getQuizInfo();
    setIsLoading(false);
  };

  const deleteQuestionHandler = async (quesId) => {
    try {
      setIsLoading(true);
      await axios.delete(
        `http://localhost:3000/quiz/${userId}/get/${quizId}/delete/${quesId}`
      );
      getQuizInfo();
    } catch (error) {
      alert("Internal server error");
    } finally {
      setIsLoading(false);
    }
  };

  const titleChangeHandler = async (e) => {
    setTitleChange(!titleChange);
    e.preventDefault();
    try {
      await changeTitleHandler(userId, quizId, title);
      await getQuizInfo();
    } catch (error) {
      console.error("Error editing title:", error);
    }
  };

  const openEditForm = (question) => {
    setEditingQuestion(question);
    setShowEditForm(true);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    setEditingQuestion(null);
  };

  const handleQuestionEdited = async () => {
    // Reload quiz info after editing a question
    await getQuizInfo();
    // Close the edit form
    closeEditForm();
  };

  return (
    <>
      <h1>Editing area</h1>
      <div className="flex w-full gap-8 h-[50vh]">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-1/2">
            {titleChange ? (
              <input
                type="text"
                className="border-2 border-solid border-black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h1>Title is {quizInfo.title}</h1>
            )}

            <button onClick={titleChangeHandler}>
              {titleChange ? "Submit" : "Edit"}
            </button>

            <div>
              <h1>Questions:</h1>
              {quizInfo.questions.map((question) => (
                <div key={question._id} className="flex justify-between my-4">
                  <h1>{question.title}</h1>
                  <button
                    className="bg-blue-500 p-2"
                    onClick={() => openEditForm(question)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 p-2"
                    onClick={() => deleteQuestionHandler(question._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => setShowForm(true)}>Add Question</button>
          </div>
        )}

        {showForm && (
          <AddQuestionComponent
            onQuestionAdded={handleQuestionAdded}
            quizId={quizId}
            userId={userId}
          />
        )}

        {showEditForm && editingQuestion && (
          <EditQuestionComponent
            question={editingQuestion}
            onQuestionEdited={handleQuestionEdited}
            userId={userId}
            quizId={quizId}
          />
        )}
      </div>
    </>
  );
};

export default Edit;
