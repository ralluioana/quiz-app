import { useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import StartQuiz from "./components/StartQuiz";

function App() {
  const [showStart, setShowStart] = useState(true);

  function handleStartQuiz() {
    setShowStart(false);
  }

  return (
    <div className="Quiz-App">
      {showStart ? (
        <StartQuiz onClick={handleStartQuiz}></StartQuiz>
      ) : (
        <Quiz></Quiz>
      )}
    </div>
  );
}

export default App;
