import { useState } from "react";
import axios from "axios";

const AddQuestionComponent = ({ onQuestionAdded, quizId, userId }) => {
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    options: [
      { title: "", isCorrect: false },
      { title: "", isCorrect: false },
      { title: "", isCorrect: false },
      { title: "", isCorrect: false },
    ],
  });

  const handleOptionChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const updatedOptions = [...newQuestion.options];
    if (type === "checkbox") {
      updatedOptions[index][name] = checked;
    } else {
      updatedOptions[index][name] = value;
    }
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const addQuestion = async (event) => {
    event.preventDefault();
    const question = [];
    question.push(newQuestion);
    try {
      await axios.post(
        `http://localhost:3000/quiz/${userId}/addQuestion/${quizId}`,
        question
      );
      // Assuming response.data is the updated quiz info
      //   setQuizInfo(response.data);
      setNewQuestion({
        title: "",
        options: [
          { title: "", isCorrect: false },
          { title: "", isCorrect: false },
          { title: "", isCorrect: false },
          { title: "", isCorrect: false },
        ],
      });

      // Call the callback function to fetch updated quiz info
      onQuestionAdded();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div className="border-2 border-solid border-black w-1/2">
      <form onSubmit={addQuestion}>
        <input
          type="text"
          placeholder="Enter question title"
          value={newQuestion.title}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, title: e.target.value })
          }
        />
        {newQuestion.options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Enter option ${index + 1}`}
              value={option.title}
              onChange={(e) => handleOptionChange(index, e)}
              name="title"
            />
            <input
              type="checkbox"
              checked={option.isCorrect}
              onChange={(e) => handleOptionChange(index, e)}
              name="isCorrect"
            />
            <label>Correct Option</label>
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddQuestionComponent;
