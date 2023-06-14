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

  //const {data:d} = useGetFormInfoQuery(userId)

  //dispatch(updateUser(d))


  if (isLoading) {
    return <div>isLoadig...</div>;
  } else if (isError) {
    return <div>error...</div>;
  }
  console.log("🚀 ~ file: index.js:39 ~ Competetion ~ data:", data);

  return (
    <div>
      <Competetion dataBaseQuestions={data} />
    </div>
  );
};

export default ShowTheQuiz;
