// In your ShowQuizData component, import the Select, MenuItem and InputLabel components from @mui/material

import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";

const ShowQuizData = () => {
  // Use the useLocation hook to get the location object
  const location = useLocation();
  const theme = useTheme()
  // Get the quizData from the location.state object
  const quizData = location.state.quizData;
  console.log("🚀 ~ file: showQuizDarta.js:5 ~ ShowQuizData ~ quizData:", quizData);
  return (
    <div>
      {quizData.map((quiz, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ backgroundColor: theme.palette.background.default }}
          >
            {/* Display the question with a label */}
            <Typography>Question: {quiz.question}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: theme.palette.background.default  }}>
            {/* Display the correct answer with a label */}
            <Typography  mb="10px"  variant="h5">Correct answer : {quiz.correct_answer}</Typography>
            
            <Typography mt="10px"  variant="h5">Incorrectanswer : 
           
            <Select
              labelId="incorrect-answers-label"
              id="incorrect-answers-select"
              value="" // You can set a default value here if you want
              label="Incorrect answers"
              sx={{ marginLeft: 1 }}
              
            >
              {/* Use a map function to display the incorrect answers as menu items */}
              {quiz.incorrect_answers.map((answer) => (
                <MenuItem value={answer}>{answer}</MenuItem>
              ))}
            </Select>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default ShowQuizData;
