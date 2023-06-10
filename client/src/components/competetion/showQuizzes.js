import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetQuizTitleDescriptionQuery } from "../../reduxToolKit/api";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import QuizIcon from '@mui/icons-material/Quiz';
const ShowQuizzes = () => {
  const { id } = useParams();
  
  const { data, isLoading, isError } = useGetQuizTitleDescriptionQuery(id);

  // navigate

  const navigate = useNavigate()

  if (isLoading){
    return <div>isLoadig...</div>;
  } 
  else if  (isError) {
    return <div>error...</div>;
}
 


  const handleTransaction = (q) => {
    navigate(`${q.id}`)
    
    //console.log("🚀 ~ file: showQuizzes.js:27 ~ handleTransaction ~ q:", q.id)
    
    
  };

  return (
    <Box>
      <Typography
        variant="h1"
        display="flex"
        justifyContent="center"
        mt="30px"
        sx={{ fontFamily: "Kanit" }}
      >
        {" "}
        Chosse the quiz
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        sx={{ height: "40vh", margin: 30, width: "79%" }}
        alignItems="center"
      >
        <List
          sx={{
            border: "1px solid gray",
            backgroundColor: "#83c5be",
            padding: 2,
            boxShadow: 2,
            height: "600px",
            width: "400px",
            borderRadius: "15px",
          }}
        >
          {data.map((quiz) => (
            // add some custom styles to the ListItem component
            <ListItem
              key={quiz.id}
              sx={{ "&:hover": { backgroundColor: "#2a9d8f" } }}
            >
              <ListItemIcon>
                <QuizIcon />
              </ListItemIcon>
              <ListItemText
                primary={quiz.title}
                onClick={() => handleTransaction(quiz)}
              />
              {/* add any icons, avatars, or secondary actions here */}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ShowQuizzes;
