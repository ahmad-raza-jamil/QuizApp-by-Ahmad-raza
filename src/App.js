import React, { useState } from "react";
import "./App.css";
import questions from "./quizData/quizQuestion.json";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    setSelectedAnswerIndex(null); // Clear selected answer
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const handleAnswerOption = (is_correct, index) => {
    if (selectedAnswerIndex === null) { // Check if an answer is already selected
      setSelectedAnswerIndex(index); // Set selected answer
      if (is_correct) {
        setScore(score + 5);
        setCorrectAns(correctAns + 1);
      }
    }
  };

  const handleQuit = () => {
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAns(0);
    setShowResult(false);
    setSelectedAnswerIndex(null);
  };

  if (showResult) {
    return (
      <div className="app">
        <div className="score-section">
          <h2>Completed!</h2>
          <h4>Total Score: {score}</h4>
          <h4>Your Correct Answers: {correctAns}</h4>
          <button onClick={handleQuit}>Play Again</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="app">
        <div className="question-section">
          <h5>Score: {score}</h5>
          <div className="question-count">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className="question-text">
            {questions[currentQuestion].question_text}
          </div>
        </div>
        <div className="answer-section">
          {questions[currentQuestion].answer_options.map((ans, index) => {
            const answerClass =
              selectedAnswerIndex === index
                ? ans.is_correct
                  ? "correct-answer"
                  : "incorrect-answer"
                : "";
            return (
              <button
                key={index}
                onClick={() => handleAnswerOption(ans.is_correct, index)}
                className={answerClass}
              >
                {ans.answer_text}
              </button>
            );
          })}
          <div className="actions">
            <button onClick={handleQuit}>Quit</button>
            <button onClick={handleNextQuestion}>Next Question</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
