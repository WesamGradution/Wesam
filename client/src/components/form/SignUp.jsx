import React , { useRef, useState,useEffect } from 'react'
import { Box,Button,TextField,InputLabel,MenuItem,Select,Checkbox,FormGroup, FormControlLabel, Typography } from '@mui/material'
import {Formik} from "formik"
import * as yup from "yup"
import { usePostFormInfoMutation, useSignUpUserMutation } from '../../reduxToolKit/api'
import { useNavigate } from 'react-router-dom'
export const SignUp = () => {

  
  const [postFormInfo] = usePostFormInfoMutation()
  const [signUpUser] = useSignUpUserMutation()
  const [errorMessage,setErrorMessage] = useState()
  const navigate = useNavigate()

  

  const handelFormSubmit = async (values,{resetForm}) => {
    console.log('🚀 ~ file: index.jsx:11 ~ handelFormSubmit ~ values:',values);
    
    //postFormInfo(values)
    const result = await signUpUser(values)
       
        if (result.error){

          setErrorMessage(result.error.data.message)
        }else{
          navigate('/')
        }
    
  
  }

  
  

  const initialValues = {
    admin:false,
    firstName :"",
    lastName :"",
    email :"",
    phoneNumber :"",
    password:"",
  }
  const phoneNumberRegEx =
  /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

const userSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Please write letter only")
    .required("required"),
  lastName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Please write letter only")
    .required("required"),
  email: yup.string().email("invalid email").required("required"),
  phoneNumber: yup
    .string()
    .matches(phoneNumberRegEx, "Phone number is not valid")
    .required("required"),
  password: yup.string().required("required"),
  
});
 

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

  

  return (
  
    
    <Box m="200px">

    <Typography textAlign="center" variant='h3' m="40px" color="green">sign Up </Typography>
    <Typography variant='h4' textAlign="center" m="40px" color="red">{errorMessage}</Typography> 
    <Formik
    onSubmit={handelFormSubmit}
    initialValues={initialValues}
    validationSchema={userSchema}
    >

      {({values,errors,touched,handleBlur,handleChange,handleSubmit})=>{
        return (

          <form onSubmit={handleSubmit}>
          <Box display="grid" gap="30px" gridTemplateColumns="repeat(4,minmax (0,1fr))">
            <TextField
            fullWidth
            variant = "filled"
            type = "text"
            label = "First Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            name="firstName"
            error={!!touched.firstName && errors.firstName }
            helperText={touched.firstName && errors.firstName}
            sx={{gridColumn:"span 1"}}
            />
            <TextField
            fullWidth
            variant = "filled"
            type = "text"
            label = "Last Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            name="lastName"
            error={!!touched.lastName && errors.lastName }
            helperText={touched.lastName && errors.lastName}
            sx={{gridColumn:"span 1"}}
            />
            <TextField
            fullWidth
            variant = "filled"
            type = "text"
            label = "Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            error={!!touched.email && errors.email }
            helperText={touched.email && errors.email}
            sx={{gridColumn:"span 1"}}
            />
            <TextField
            fullWidth
            variant = "filled"
            type = "text"
            label = "Password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            error={!!touched.password && errors.password }
            helperText={touched.password && errors.password}
            sx={{gridColumn:"span 1"}}
            />
            <TextField
            fullWidth
            variant = "filled"
            type = "text"
            label = "Phone Number"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phoneNumber}
            name="phoneNumber"
            error={!!touched.phoneNumber && errors.phoneNumber }
            helperText={touched.phoneNumber && errors.phoneNumber}
            sx={{gridColumn:"span 2"}}
            />
       
          <Box display="flex" justifyContent="start">
          
          </Box>
            
              
          
          </Box>
          
          
        <Box display="flex" justifyContent="end" mt="-20px">
            <Button type='submit'  variant='contained' >
              Create New User
            </Button>
          </Box>
          
        </form>
        
        )
        
      }}
    </Formik>



    </Box>
   
    
  )
}
export default SignUp;


