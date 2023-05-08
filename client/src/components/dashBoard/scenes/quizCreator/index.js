import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup"
import Header from "../../../Header";
import { Box,Button,InputLabel, Select, TextField,MenuItem } from "@mui/material";
function QuizCreator() {
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

  const initialValues = {
    questions:"",
    answer:""
  }

  const quizSchema = yup.object().shape({
    questions:yup.string().required("requires"),
    answer:yup.string().required("required"),
  })
  return (
    <Box  m="20px" >
    <Header title="Quiz" subtitle="Write your own Quiz"></Header>

    <Formik 
    onSubmit={handleSubmit}
    initialValues={initialValues}
    validationSchema={quizSchema}
    >

      {({values,errors,touched,handleBlur,handleChange,handleSubmit})=>{

        return(

          <Form>
          {questions.map((question, index) => (
        <Box display="grid" gap="30px" key={index}>
          
            <TextField
              type="text"
              variant="filled"
              label="Write Question"
              value={question.question}
              sx={{gridColumn:"span 1"}}
              onChange={(event) => handleQuestionChange(index, event)}
              
            />
          
          {question.answers.map((answer, answerIndex) => (
            <Box display="grid"  gap="30px" key={index}>
              
                
                <TextField
                  type="text"
                  key={answerIndex}
                  variant="filled"
                  label="Write Answer"
                  sx={{gridColumn:"span 1"}}
                  value={answer}
                  onChange={(event) =>
                    handleAnswerChange(index, answerIndex, event)
                  }
                  
                />
              
              {question.answers.length > 2 && (
                <Button
                  type="button"
                  key={answerIndex}
                  color="secondary"
                  variant="contained"
                  onClick={() => removeAnswer(index, answerIndex)}
                >
                  Remove Answer
                </Button>
              )}
            </Box>
          ))}
          <Button type="button"  color="secondary" variant="contained"
                   onClick={() => addAnswer(index)}>
            Add Answer
          </Button>
          
          <InputLabel>
            Correct Answer
            <Select
              value={question.correctAnswer}
              onChange={handleCorrectAnswerChange}
              required
            >
              <MenuItem value="">Select an answer</MenuItem>
              {question.answers.map((answer, answerIndex) => (
                <MenuItem key={answerIndex} value={answer}>
                  {answer}
                </MenuItem>
              ))}
            </Select>
          </InputLabel>
          
          <InputLabel>
            T/F Answers
            <TextField
              type="checkbox"
              checked={question.answers[0] === "True" && question.answers[1] === "False"}
              onChange={(event) => handleTrueFalseChange(index, event)}
            />
          </InputLabel>
          {questions.length > 1 && (
            <Button type="button" color="secondary" variant="contained" onClick={() => removeQuestion(index)}>
              Remove Question
            </Button>
          )}
          
        </Box>//block of code the parent
      ))}

          </Form>
        )


      }}
    </Formik>
      
      <Box></Box>
      
      <Box display="flex" justifyContent="end">
      <Button type="button" color="secondary" variant="contained" onClick={addQuestion}>
        Add Question
      </Button>
      </Box>
      <Box display="flex" justifyContent="start" >
      <Button type="submit" color="secondary" variant="contained">Submit</Button>
      </Box>


      <Box/>
      
    
    </Box>
  );
}

export default QuizCreator;