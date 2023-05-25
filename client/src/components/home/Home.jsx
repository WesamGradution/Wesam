import React, { useState } from "react";

function Home() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", correctAnswer: "", answers: ["", ""] },
    ]);
  };

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
  };

  return (
    <div>
      hello wesam
    </div>
  );
}

export default Home;