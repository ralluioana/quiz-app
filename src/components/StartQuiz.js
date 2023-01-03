import React from "react";

export default function StartQuiz({ onClick }) {
  return (
    <main>
      <h1> Quizzical Trivia</h1>
      <h4>Click START nu begin the quiz</h4>
      <button className="startQuizButton" onClick={onClick}>
        START
      </button>
    </main>
  );
}
