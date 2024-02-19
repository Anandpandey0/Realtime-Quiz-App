import { useState } from "react";
import axios from "axios";

const EditQuestionComponent = ({
  question,
  onQuestionEdited,
  userId,
  quizId,
}) => {
  const [editedQuestion, setEditedQuestion] = useState(question);

  const handleOptionChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const updatedOptions = [...editedQuestion.options];
    if (type === "checkbox") {
      updatedOptions[index][name] = checked;
    } else {
      updatedOptions[index][name] = value;
    }
    setEditedQuestion({ ...editedQuestion, options: updatedOptions });
  };

  const editQuestion = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3000/quiz/${userId}/get/${quizId}/edit/${question._id}`,
        editedQuestion
      );
      if (!response) {
        alert("Something went wrong");
      }

      onQuestionEdited();
    } catch (error) {
      console.error("Error editing question:", error);
    }
  };

  return (
    <div className="border-2 border-solid border-black w-1/2">
      <form onSubmit={editQuestion}>
        <input
          type="text"
          placeholder="Enter question title"
          value={editedQuestion.title}
          className="w-[30vw]"
          onChange={(e) =>
            setEditedQuestion({ ...editedQuestion, title: e.target.value })
          }
        />
        {editedQuestion.options.map((option, index) => (
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

export default EditQuestionComponent;
