import React, { useState } from "react";
import { useGetAdminGroupQuery, usePostQuestionMutation } from "../../../../reduxToolKit/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../reduxToolKit/userSlice";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";

function QuizCreator() {
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", correctAnswer: "", answers: ["", ""], points: 1 },
  ]);
  const [time, setTime] = useState(10);
  const [unlimitedTime, setUnlimitedTime] = useState(false);
  const [group_id,setGroup_id] = useState([])

  // hook to send data
  const [postQuiz] = usePostQuestionMutation();

  // get the admin id
  const { _id } = useSelector(selectUser);

  // get admin group 
  const {
    data: data_group,
    isLoading: isLoading_group,
    isError: isError_group,
  } = useGetAdminGroupQuery(_id);

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

  const handlePointChange = (questionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].points = parseInt(event.target.value);
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

  const handleChange = (e) =>{
    setGroup_id(e.target.value)
  }

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
        points: question.points,
      };
    });
    console.log(formattedQuestions);
    console.log("Time: ", time);
    console.log("title: ", title);

    const sendQuiz = {
      group_id,
      creator_id: _id,
      title,
      description,
      timer:time == "unlimited" ? null : time,
      quizData: formattedQuestions,
    };

    postQuiz(sendQuiz)
    console.log("🚀 ~ file: index.js:146 ~ handleSubmit ~ sendQuiz:", sendQuiz);
    setQuestions([{ question: "", correctAnswer: "", answers: ["", ""], points: 1 }]);
    setTime(10);
    setUnlimitedTime(false)
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDiscriptionChange = (event) => {
    setDiscription(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{alignContent:"center", alignItems:"c"}}>
      <label>
        Quiz Title:
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </label>
      <br />
      <label>
        description:
        <input
          type="text"
          value={description}
          onChange={handleDiscriptionChange}
          required
        />
      </label>
      <br />
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
      <label>
        <input
          type="checkbox"
          checked={unlimitedTime}
          onChange={handleUnlimitedTimeChange}
        />
        Unlimited Time
      </label>
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
            <br />
            <label>
              T/F Answers
              <input
                type="checkbox"
                checked={
                  question.answers[0] === "True" &&
                  question.answers[1] === "False"
                }
                onChange={(event) => handleTrueFalseChange(index, event)}
              />
            </label>
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
                  X
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
            Points
            <input
              type="number"
              value={question.points}
              onChange={(event) => handlePointChange(index, event)}
              min="0"
              required
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
      <button
        type="button"
        onClick={() =>
          setQuestions([
            ...questions,
            { question: "", correctAnswer: "", answers: ["", ""], points: 1 },
          ])
        }
      >
        Add Question
      </button>
      <br />
      <Box display="flex" justifyContent="start" mt="30px">
                
                <InputLabel id="group-select-label" sx={{ marginRight: 2,marginTop:1 }}>
                  Group :
                </InputLabel>

                <Select
                  labelId="group-select-label"
                  id="demo-simple-select"
                  name="group_id"
                  multiple
                  value={group_id}
                  onChange={handleChange}
                  variant="standard"
                  required
                >
                  {data_group &&
                    data_group.map((data) => {
                      return (
                        <MenuItem value={data._id}>{data.title}</MenuItem>
                      );
                    })}
                </Select>
              
             
                <button type="submit">Submit</button>
              
            </Box>
      
    </form>
  );
}

export default QuizCreator;
