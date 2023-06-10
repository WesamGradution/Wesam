import React, { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {useGetFormInfoQuery, useSignInUserMutation} from "../../reduxToolKit/api"
import { Box, Button, FormControl, InputLabel, TextField, Typography } from "@mui/material";
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

  
  

    const[formInfo,setFormInfo] = useState({
        email: "",
        password: ""
    });

    const [errorMessage,setErrorMessage] = useState("")
    const [signInUser,{isSuccess }] = useSignInUserMutation()


    
    const user = useSelector(selectUser)
    console.log("🚀 ~ file: SignIn.js:44 ~ SignIn ~ user:", user)
    const location = useLocation()
    const navigate = useNavigate()

    const {from } = location.state || {from :{pathname:"/home"}}
    
    
    
    
    
    

    const handelForm = async (e) => {
      e.preventDefault();
    
      const result = await signInUser(formInfo);
    
      if (result.error) {
        setErrorMessage(result.error.data.message);
      } else {

        if(result.data.admin){
          navigate("/dashboard")
        }else{
          navigate(from )

        }
        
        
        
        
        
        
      }
    };
    


    return(
        
      <Box sx={{ margin: 40 }}>
      <Typography variant="h3">Sign in</Typography>
      <p>{errorMessage}</p>
      <FormControl fullWidth>
        
        <TextField
          name="email"
          label="email"
          value={formInfo.email}
          onChange={(e) => setFormInfo({...formInfo, email: e.target.value})}
        />
      </FormControl>
      <FormControl fullWidth>
        
        <TextField
          name="password"
          placeholder="password"
          type="password"
          value={formInfo.password}
          onChange={(e) => setFormInfo({...formInfo, password: e.target.value})}
        />
      </FormControl>
      <Box m="20px" display="flex" justifyContent="start">
      <Button variant="contained" color="primary" onClick={handelForm} >
        Submit
      </Button>
      </Box>
      <br />
      <Typography variant="body1">You don't have account? <Link to="/signUp">Sign up</Link></Typography>
    </Box>
      
    )
}

export default SignIn;