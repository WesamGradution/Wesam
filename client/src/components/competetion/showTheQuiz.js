import React from "react";
import { useGetQuizDataQuery } from "../../reduxToolKit/api";
import { useParams } from "react-router-dom";
import Competetion from ".";

const ShowTheQuiz = () => {
  const { quizId } = useParams();
  const { data, isLoading, isError } = useGetQuizDataQuery(quizId);

  if (isLoading) {
    return <div>isLoadig...</div>;
  } else if (isError) {
    return <div>error...</div>;
  }
  console.log("🚀 ~ file: index.js:39 ~ Competetion ~ data:", data);

  return <div><Competetion dataBaseQuestions={data}/></div>;
};

export default ShowTheQuiz;
