import React , { useRef } from 'react'
import { Box,Button,TextField,Input } from '@mui/material'
import {Formik} from "formik"
import * as yup from "yup"
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from "../../../Header"
import Papa from 'papaparse';
import { usePostFormInfoMutation } from '../../../../reduxToolKit/api'

export const AddUser = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [postFormInfo] = usePostFormInfoMutation()
  const fileInputRef = useRef();

  const handelFormSubmit  = (values) => {
    console.log("🚀 ~ file: index.jsx:11 ~ handelFormSubmit ~ values:", values)
    
    // Get the file from the ref
    const file = fileInputRef.current.files[0];
    console.log(file)

    // Check if the file exists and is a CSV file
    if (file && file.type === 'text/csv') {
      // Create a FileReader object
      const reader = new FileReader();

      // Define a callback function for when the file is loaded
      reader.onload = () => {
        // Get the file content as a string
        const csvString = reader.result;

        // Parse the CSV string using Papa Parse
        const csvData = Papa.parse(csvString, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        // Check if the parsing was successful and the data is not empty
        if (csvData.errors.length === 0 && csvData.data.length > 0) {
          // Loop through the data array and post each row to the server using the hook
          for (const row of csvData.data) {
            postFormInfo(row)
              .unwrap()
              .then((response) => {
                // Handle the response
                console.log(response.data);
              })
              .catch((error) => {
                // Handle the error
                console.error(error);
              });
          }
        } else {
          // Handle the parsing errors or empty data
          console.error('Invalid or empty CSV file');
        }
      };

      // Read the file as a text string
      reader.readAsText(file);
    } else {
      // Handle the missing or wrong file type
      console.error('Please select a CSV file');
    }
  };

  const initialValues = {
    firstName :"",
    lastName :"",
    email :"",
    phoneNumber :"",
    password:"",
  }

  const phoneNumberRegEx = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
  const userSchema = yup.object().shape({
    firstName:yup.string(),
    lastName:yup.string(),
    email:yup.string().email("invalid email"),
    phoneNumber:yup.string().matches(phoneNumberRegEx,"Phone number is not valid"),
    password:yup.string()
  })

  return (
    <Box m="20px">

    <Header title="CREATE USER" subtitle="Create a New User"></Header>    

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
            sx={{gridColumn:"span 2"}}
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
            sx={{gridColumn:"span 2"}}
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
            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                sx={{gridColumn:"span 2"}}
              />
            
              
          
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type='submit' color='secondary' variant='contained'>
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
export default AddUser;


