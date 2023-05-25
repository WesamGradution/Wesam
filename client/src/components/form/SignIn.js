import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {useGetFormInfoQuery, useSignInUserMutation} from "../../reduxToolKit/api"
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../reduxToolKit/userSlice";
function SignIn() {

  useEffect(() => {
    // set the style of the body element
    document.body.style.fontFamily = "Source Sans Pro";
    document.body.style.color = "white";
    document.body.style.fontWeight = "300";
    document.body.style.background = "#50a3a2";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    // return a function to reset the style when the component unmounts
    return () => {
      document.body.style.fontFamily = null;
      document.body.style.color = null;
      document.body.style.fontWeight = null;
      document.body.style.background = null;
      document.body.style.width = null;
      document.body.style.height = null;
    };
  }, []); 

  const [signInUser,{isSuccess }] = useSignInUserMutation()
  

    const[formInfo,setFormInfo] = useState({
        email: "",
        password: ""
    });

    const [errorMessage,setErrorMessage] = useState("")


    
    const user = useSelector(selectUser)
    
    console.log(user)
    
    
    
    const navigate = useNavigate()

    const handelForm = async (e) => {
      e.preventDefault();
    
      const result = await signInUser(formInfo);
    
      if (result.error) {
        setErrorMessage(result.error.data.message);
      } else {
        // wait for the promise to resolve
        if (isSuccess){
          console.log(user);
        }
        // log the user value after the state has been updated
        
      }
    };
    


    return(
        
      <Box >
            <h1 >Sign in </h1>
            <p>{errorMessage}</p>
          <form  onSubmit={handelForm}  >

            <input name="email" placeholder="email" value={formInfo.email} 
            onChange={(e) => setFormInfo({...formInfo,email:e.target.value})} />

            <input name="password" placeholder="password" value={formInfo.password} type="password" 
            onChange={(e)=> setFormInfo({...formInfo,password:e.target.value})} ></input>
            <button c>Submit</button>
            <br/>
            <p>You don't have account? <Link to="/signUp">Sign up</Link> </p>
        </form>
          
      </Box>
      
    )
}

export default SignIn;