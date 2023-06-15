import React from "react";
import { useGetQuizDataQuery } from "../../reduxToolKit/api";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
 
} from "react-router-dom";
import Competetion from ".";
import { useEffect } from "react";
import { updateUser } from "../../reduxToolKit/userSlice";


const ShowTheQuiz = () => {
  const { quizId } = useParams();
  console.log("🚀 ~ file: showTheQuiz.js:8 ~ ShowTheQuiz ~ quizId:", quizId);
  const { data, isLoading, isError } = useGetQuizDataQuery(quizId);
  console.log("🚀 ~ file: showTheQuiz.js:19 ~ ShowTheQuiz ~ data:", data)

  //const {data:d} = useGetFormInfoQuery(userId)

  //dispatch(updateUser(d))

  const location = useLocation();
  const state = location.state;


  if (isLoading) {
    return <div>isLoadig...</div>;
  } else if (isError) {
    return <div>error...</div>;
  }


  console.log("🚀 ~ file: index.js:39 ~ Competetion ~ data:", data);

  if (state && state.from === "/Competetion/:id") {
    // Render the ShowTheQuiz component
    return (
      <div>
        {/* Your existing code for showing the quiz details and allowing the user to take it */}
        <Competetion dataBaseQuestions={data} />
      </div>
    );
  } else {
    // Redirect the user back to the ShowQuizzes component
    return <Navigate to={`/Competetion`} />;
  }

  
};

export default ShowTheQuiz;
