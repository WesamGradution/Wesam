import React from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetQuizTitleDescriptionQuery, useUpdatedQuizAttempsMutation } from "../../reduxToolKit/api";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import QuizIcon from '@mui/icons-material/Quiz';
import { useSelector } from "react-redux";
import { selectUser } from "../../reduxToolKit/userSlice";
import { useDispatch } from "react-redux";


const ShowQuizzes = () => {
  const { id } = useParams();
  const location = useLocation()
  const state = location.state

  const {groups,_id} = useSelector(selectUser)
  console.log("🚀 ~ file: showQuizzes.js:12 ~ ShowQuizzes ~ _id:", _id)
  const [updateAttemps] = useUpdatedQuizAttempsMutation();

 

  const groups_id = groups.map(group => group._id)
  console.log("🚀 ~ file: showQuizzes.js:15 ~ ShowQuizzes ~ groups_id:", groups_id)
  
  
  const { data, isLoading, isError, refetch } = useGetQuizTitleDescriptionQuery({
    userId: _id,
    groupId: id,
  });
  



  // navigate

  const navigate = useNavigate()

  if (isLoading){
    return <div>isLoadig...</div>;
  } 
  else if  (isError) {
    return <div>error...</div>;
}
 



const handleTransaction = async (q) => {
  
    console.log("🚀 ~ file: showQuizzes.js:39 ~ handleTransaction ~ q:", q.id);
  await updateAttemps({ userId: _id, quizId: q.id });
  refetch();
  // Pass some state to the navigate function
  navigate(`${q.id}`, { state: { from: "/Competetion/:id" } });
  
    // Redirect the user back to the ShowQuizzes component
    
  
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
