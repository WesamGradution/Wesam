import React,{useEffect} from "react";
import SignIn from "./components/form/SignIn"
import {Route,Routes} from "react-router-dom"
import SignUp from "./components/form/SignUp";
import Home from "./components/home/Home";
import AppDashboard from "./components/dashBoard/AppDashboard";

function App() {
  
  return (
    
    <div className="container">
      <Routes> 
        <Route path="/" exact element={<SignIn />}></Route>
        <Route path="/signUp" exact element={<SignUp/>}></Route>
        <Route path="/home" exact element={<Home/>}></Route>
      </Routes>
      
      <AppDashboard/>
    </div>
    
  );
}

export default App;
