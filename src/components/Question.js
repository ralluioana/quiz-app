import React from "react";

export default function Question({ question, handleAnswerClick, checkQuiz }) {
  function setAnswerColor(answer) {
    if (checkQuiz) {
      if (answer.isSelected === true && answer.isCorrect === true) {
        return "answersButtons correctAnswer";
      }
      if (answer.isSelected === true && answer.isCorrect === false) {
        return "answersButtons wrongAnswer";
      }
      if (answer.isSelected === false && answer.isCorrect === false) {
        return "answersButtons";
      }
      if (answer.isSelected === false && answer.isCorrect === true) {
        return "answersButtons correctAnswer";
      }
    } else {
      return answer.isSelected ? "answersButtons selected" : "answersButtons";
    }
  }

  return (
    <div>
      <h4 className="questionText">{question.text}</h4>
      <div className="answersContainer">
        {question.answers.map((answer) => (
          <button
            className={setAnswerColor(answer)}
            key={answer.text}
            onClick={() => handleAnswerClick(answer)}
          >
            {answer.text}
          </button>
        ))}
      </div>
      <hr></hr>
    </div>
  );
}
