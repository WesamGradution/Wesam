import React from "react";
import SignIn from "./components/form/SignIn"
import {Route,Routes} from "react-router-dom"
import SignUp from "./components/form/SignUp";


import Quiz from "./components/dashBoard/scenes/quiz";
import AppDashboard from "./components/dashBoard/AppDashboard";
import { useGetQuestionQuery } from "./reduxToolKit/api";
import JoinGroup from "./components/joinGroup";
import Home from "./components/home/Home";

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
        <Route path="/home" exact element={<Home dataBaseQuestions={data}/>}></Route>
        <Route path="/groups/join/:id" element={<JoinGroup/>}></Route>
        
      </Routes>
      
      
        <AppDashboard/>
    
     
    </div>
    
  );
}

export default App;
