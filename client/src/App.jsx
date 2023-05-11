import React from "react";
import SignIn from "./components/form/SignIn"
import {Route,Routes} from "react-router-dom"
import SignUp from "./components/form/SignUp";


import Quiz from "./components/dashBoard/scenes/quiz";
import AppDashboard from "./components/dashBoard/AppDashboard";
import { useGetQuestionQuery } from "./reduxToolKit/api";
function App() {
  const {data, isLoading, isError} = useGetQuestionQuery();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }
  
  return (
    
    <div className="container">
      <Routes> 
        <Route path="/" exact element={<SignIn />}></Route>
        <Route path="/signUp" exact element={<SignUp/>}></Route>
        <Route path="/home" exact element={<Quiz dataBaseQuestions={data}  />}></Route>
      </Routes>
      
      <AppDashboard/>
    </div>
    
  );
}

export default App;
/* dataBaseQuestions={[{question: "is water the best?", correct_answer: "True", incorrect_answers: ["False", "Wrong"]}, {question: "is water the best of the best?", correct_answer: "very True", incorrect_answers: ["veeeery False"]}]}‏*/