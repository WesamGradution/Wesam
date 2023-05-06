import React, { useState } from "react";

function QuizCreator() {
  const [questions, setQuestions] = useState([{ question: "", correctAnswer: "", answers: ["", ""] }]);
  const [time, setTime] = useState(10);
  const [unlimitedTime, setUnlimitedTime] = useState(false);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const addAnswer = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push("");
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(newQuestions);
  };

  const handleTrueFalseChange = (questionIndex, event) => {
    const newQuestions = [...questions];
    const isChecked = event.target.checked;

    if (isChecked) {
      newQuestions[questionIndex].answers = ["True", "False"];
    } else {
      newQuestions[questionIndex].answers = ["", ""];
    }

    setQuestions(newQuestions);
  };

  const handleTimeChange = (event) => {
    if (!unlimitedTime) {
      setTime(event.target.value);
    }
  };

  const handleUnlimitedTimeChange = (event) => {
    setUnlimitedTime(event.target.checked);
    if (event.target.checked) {
      setTime("unlimited");
    } else {
      setTime(10);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for duplicate questions
    const questionTexts = questions.map((q) => q.question);
    const uniqueQuestionTexts = new Set(questionTexts);
    if (questionTexts.length !== uniqueQuestionTexts.size) {
      alert("Each question must have a unique text");
      return;
    }

    // Check for duplicate answers within each question
    for (const question of questions) {
      const answerTexts = question.answers;
      const uniqueAnswerTexts = new Set(answerTexts);
      if (answerTexts.length !== uniqueAnswerTexts.size) {
        alert("Each answer in a question must be unique");
        return;
      }
    }

    // Format the quiz data
    const formattedQuestions = questions.map((question) => {
      const correctAnswer = question.correctAnswer;
      const incorrectAnswers = question.answers.filter(
        (answer) => answer !== correctAnswer
      );
      return {
        question: question.question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      };
    });
    console.log(formattedQuestions);
    console.log("Time: ", time);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Set Time (in minutes):
        <input
          type="number"
          value={time}
          onChange={handleTimeChange}
          min="1"
          disabled={unlimitedTime}
        />
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={unlimitedTime}
          onChange={handleUnlimitedTimeChange}
        />
        Unlimited Time
      </label>
      <br />
      {questions.map((question, index) => (
        <div key={index}>
          <label>
            Question #{index + 1}
            <input
              type="text"
              value={question.question}
              onChange={(event) => handleQuestionChange(index, event)}
              required
            />
          </label>
          <br />
          {question.answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <label>
                Answer #{answerIndex + 1}
                <input
                  type="text"
                  value={answer}
                  onChange={(event) =>
                    handleAnswerChange(index, answerIndex, event)
                  }
                  required
                />
              </label>
              {question.answers.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeAnswer(index, answerIndex)}
                >
                  Remove Answer
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addAnswer(index)}>
            Add Answer
          </button>
          <br />
          <label>
            Correct Answer
            <select
              value={question.correctAnswer}
              onChange={(event) => handleCorrectAnswerChange(index, event)}
              required
            >
              <option value="">Select an answer</option>
              {question.answers.map((answer, answerIndex) => (
                <option key={answerIndex} value={answer}>
                  {answer}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            T/F Answers
            <input
              type="checkbox"
              checked={
                question.answers[0] === "True" && question.answers[1] === "False"
              }
              onChange={(event) => handleTrueFalseChange(index, event)}
            />
          </label>
          {questions.length > 1 && (
            <button type="button" onClick={() => removeQuestion(index)}>
              Remove Question
            </button>
          )}
          <hr />
        </div>
      ))}
      <button type="button" onClick={() => setQuestions([...questions, { question: "", correctAnswer: "", answers: ["", ""] }])}>
        Add Question
      </button>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuizCreator; 