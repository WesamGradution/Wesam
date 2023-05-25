import React , { useRef, useState } from 'react'
import { Box,Button,TextField,InputLabel,MenuItem,Select,Checkbox,FormGroup, FormControlLabel } from '@mui/material'
import {Formik} from "formik"
import * as yup from "yup"
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from "../../../Header"
import { useGetGroupInfoQuery, useUpdateFormMutation } from '../../../../reduxToolKit/api'

const UpdateUser = () => {
  
  
  const [updateUser] = useUpdateFormMutation()
  

  

  const handelFormSubmit = (values,{resetForm}) => {
    console.log('🚀 ~ file: index.jsx:11 ~ handelFormSubmit ~ values:',values);
    
    updateUser(values)
    resetForm()
  
  }

  

  

  const initialValues = {
    admin:false,
    firstName :"",
    lastName :"",
    email :"",
    phoneNumber :"",
    password:"",
    id_updated_user:"",
  }

  const phoneNumberRegEx = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
  const userSchema = yup.object().shape({
    firstName:yup.string().required("required"),
    lastName:yup.string().required("required"),
    email:yup.string().email("invalid email").required("required"),
    phoneNumber:yup.string().matches(phoneNumberRegEx,"Phone number is not valid").required("required"),
    password:yup.string().required("required"),
    id_updated_user:yup.string().matches(/^[0-9a-fA-F]{24}$/, "Invalid mongodb id").required("required")
  })

  return (
    <Box m="20px">

    <Header title="UPDATE USER" subtitle="Update User"></Header>    

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
            <TextField
            fullWidth
            variant = "filled"
            type = "text"
            label = "Write ID of Updated user"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.id_updated_user}
            name="id_updated_user"
            error={!!touched.id_updated_user && errors.id_updated_user }
            helperText={touched.id_updated_user && errors.id_updated_user}
            sx={{gridColumn:"span 2"}}
            />
            
            <FormGroup >

            <FormControlLabel control={<Checkbox 
            checked={values.admin}  
            onChange={handleChange}
            name="admin"
            />} label="Admin"></FormControlLabel>
            </FormGroup>
            
            <Box display="flex" justifyContent="start"  sx={{flexDirection:"column"}} >
            
            

            
          
          </Box>
          <Box display="flex" justifyContent="start">
          
          </Box>
            
              
          
          </Box>
          
          
        <Box display="flex" justifyContent="end" mt="-20px">
            <Button type='submit' color='secondary' variant='contained' >
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

export default UpdateUser