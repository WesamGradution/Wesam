import React,{useEffect} from "react";
import { useDispatch } from "react-redux";
import {getPosts} from "./actions/posts" 
import Form from "./components/form/form"
import {BrowserRouter as Router ,Route,Routes} from "react-router-dom"
function App() {
  
  return (
    <Router>
    <div className="container">
      <Routes> 
        <Route path="/" exact element={<Form/>}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
