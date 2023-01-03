import React, { useState } from "react";
import { useEffect } from "react";
import Question from "./Question";

export default function Quiz() {
  const quizApi = " https://the-trivia-api.com/api/questions";
  const [questions, setAllQuestions] = useState([]);
  const [checkQuiz, setCheckQuiz] = useState(false);
  const [rightAnswers, setRightAnswers] = useState(0);

  function shuffle(array) {
    const newArray = [...array];

    newArray.reverse().forEach((item, index) => {
      const j = Math.floor(Math.random() * (index + 1));
      [newArray[index], newArray[j]] = [newArray[j], newArray[index]];
    });

    return newArray;
  }

  function setQuestionsList(apiQuestions) {
    console.log("Api ", apiQuestions);

    let questionsList = [];

    apiQuestions.forEach((element) => {
      let answers = [];
      element.incorrectAnswers.forEach((incorrectAnsw) => {
        let answer = { text: "", isSelected: false, isCorrect: false };
        answer.text = incorrectAnsw;
        answer.isCorrect = false;
        answers.push(answer);
      });
      answers.push({
        text: element.correctAnswer,
        isSelected: false,
        isCorrect: true,
      });

      questionsList.push({
        text: element.question,
        id: element.id,
        answers: shuffle(answers),
        isAnswered: false,
      });
    });
    setAllQuestions(questionsList);
  }

  useEffect(() => {
    if (checkQuiz === false) {
      fetch(quizApi)
        .then((res) => res.json())
        .then((apiQuestions) => setQuestionsList(apiQuestions));
    }
  }, [checkQuiz]);

  function handleAnswerClick(clickedAnswer) {
    console.log("Answer was clicked ", clickedAnswer.text);
    let updatedQuestionList = [...questions];
    updatedQuestionList.forEach((ques) => {
      ques.answers.forEach((ans) => {
        if (ans === clickedAnswer) {
          if (ans.isSelected === true && ques.isAnswered === true) {
            ans.isSelected = !clickedAnswer.isSelected;
            ques.isAnswered = false;
          } else {
            if (ans.isSelected === false && ques.isAnswered === false) {
              ans.isSelected = !clickedAnswer.isSelected;
              ques.isAnswered = true;
            }
          }
        }
      });
    });
    console.log("updatedQuestionList ", updatedQuestionList);
    setAllQuestions(updatedQuestionList);
  }

  function handleCheckQuiz() {
    setCheckQuiz(!checkQuiz);
    let rightNr = 0;
    questions.forEach((ques) => {
      ques.answers.forEach((ans) => {
        if (ans.isSelected === true && ans.isCorrect === true) rightNr++;
      });
    });
    setRightAnswers(rightNr);
  }

  return (
    <main>
      <div className="quizContainer">
        {questions.map((ques) => (
          <Question
            checkQuiz={checkQuiz}
            question={ques}
            key={ques.id}
            handleAnswerClick={handleAnswerClick}
          ></Question>
        ))}
      </div>
      <button className="quizButton" onClick={handleCheckQuiz}>
        {checkQuiz ? "Play again" : "Check Answers"}
      </button>
      {checkQuiz && (
        <h2>
          You scored {rightAnswers}/{questions.length} correct answers
        </h2>
      )}
    </main>
  );
}
