import React from "react";
import SignIn from "./components/form/SignIn"
import {Route,Routes} from "react-router-dom"
import SignUp from "./components/form/SignUp";


import Quiz from "./components/dashBoard/scenes/quiz";
import AppDashboard from "./components/dashBoard/AppDashboard";
import { useGetQuestionQuery } from "./reduxToolKit/api";
import JoinGroup from "./components/joinGroup";
import Home from "./components/home/Home";
import NavbarUser from "./components/navbarUser";
import { useSelector } from "react-redux";
import { selectUser } from "./reduxToolKit/userSlice";
import Notification from "./components/notificationn";
import Competetion from "./components/competetion";
import Opportunuties from "./components/opportunuties";
import Store from "./components/store";
import RouterCheckingUser from "./components/routeCheckingUser";
import AnimatedCard from "./components/notificationn";
import ShowGroup from "./components/competetion/showGroup";
import ShowQuizzes from "./components/competetion/showQuizzes";
import ShowTheQuiz from "./components/competetion/showTheQuiz";
import System from "./components/system";
import ShowGroupOpportunity from "./components/opportunuties/showGrops";

function App() {


  
  
  
  return (
    
    <div className="container">

      <Routes> 
       
        
          <Route path="/" exact element={<SignIn />}></Route>
          <Route path="/signUp" exact element={<SignUp/>}></Route>
          <Route path="/groups/join/:groupId" element={<JoinGroup/>}></Route>
          <Route path="/createAdmin" element={<System/>}></Route>

          
        <Route element={<NavbarUser/>}>
          
          <Route path="/home"  element={<Home/>}></Route>
          <Route path="/Notification" exact element={<Notification/>}></Route>
          <Route path="/Competetion" exact element={<ShowGroup  />}></Route>
          <Route path="/Competetion/:id" exact element={<ShowQuizzes/>}></Route>
          <Route path="/Competetion/:id/:quizId" exact element={<ShowTheQuiz/>}></Route>
          <Route path="/Opportunuties" exact element={<ShowGroupOpportunity/>}></Route>
          <Route path="/Opportunuties/:id" exact element={<Opportunuties/>}></Route>
          <Route path="/Store" exact element={<Store/>}></Route>
        </Route>
       
      </Routes>
     
      
        <AppDashboard/>
    
     
    </div>
    
  );
}

export default App;
 /*dataBaseQuestions={data}*/