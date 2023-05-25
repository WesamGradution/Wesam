import React , { useRef, useState } from 'react'
import { Box,Button,TextField,InputLabel,MenuItem,Select,Checkbox,FormGroup, FormControlLabel, Typography } from '@mui/material'
import {Formik} from "formik"
import * as yup from "yup"
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from "../../../Header"
import Papa from 'papaparse';
import { usePostFormInfoMutation, useSignUpUserMutation } from '../../../../reduxToolKit/api'
import { useGetGroupInfoQuery } from '../../../../reduxToolKit/api';
import { useNavigate } from 'react-router-dom'
export const AddUser = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [postFormInfo] = usePostFormInfoMutation()
  const [signUp] = useSignUpUserMutation()
  const [errorMessage,setErrorMessage] = useState()
  const navigate = useNavigate()
  const fileInputRef = useRef();

  

  const handelFormSubmit = async (values,{resetForm}) => {
    console.log('🚀 ~ file: index.jsx:11 ~ handelFormSubmit ~ values:',values);
    
    //postFormInfo(values)
    const result = await signUp(values)
       
        if (result.error){

          setErrorMessage(result.error.data.message)
        }
    resetForm()
  
  }

  const handelFileUpload =   () =>{
    // Get the file from the ref
    const file = fileInputRef.current.files[0];
    //console.log(file)
  
    // Check if the file exists and is a CSV file
    if (file && file.type === 'text/csv') {
      // Create a FileReader object
      const reader = new FileReader();
  
      // Define a callback function for when the file is loaded
      reader.onload = async () => {
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
          // Create a Map object to store unique combinations of firstName and lastName
          const names = new Map();
          
          // Create another Map object to store unique email addresses
          const emails = new Map();
          
          // Create a Set object to store unique phone numbers
          const phoneNumbers = new Set();
          
          // Create an array to store errors or duplicates
          const errors = [];
  
          // Loop through the data array and post each row to the server using the hook
          for (const row of csvData.data) {
            // Create a key from the combination of firstName and lastName
            const nameKey = `${row.firstName}-${row.lastName}`;
  
            // Create another key from the email address
            const emailKey = row.email;
  
            // Get the phone number value
            const phoneNumberValue = row.phoneNumber;
  
            // Check if any of the keys or values already exist in the data structures
            if (
              names.has(nameKey) ||
              emails.has(emailKey) ||
              phoneNumbers.has(phoneNumberValue)
            ) {
              // Skip this row and add it to the errors array
              errors.push(row);
            } else {
              // Insert this row into the database and add the keys and values to the data structures

              try{

                await userSchema.validate(row);

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
              names.set(nameKey, row);
              emails.set(emailKey, row);
              phoneNumbers.add(phoneNumberValue);
              }catch (validationError) {
                // Handle the validation error
                console.error(validationError);
                errors.push(row);
              }
              
            }
          }
  
          // Check if there were any errors or duplicates
          if (errors.length > 0) {
            // Send back a response with the status code and the list of errors or duplicates
            console.log({ message: 'Duplicate data found', errors });
          } else {
            // Send back a response with the status code and the number of users inserted
            console.log({ message: 'Users inserted successfully', count: names.size });
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
    admin:false,
    firstName :"",
    lastName :"",
    email :"",
    phoneNumber :"",
    password:"",
  }

  const phoneNumberRegEx = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
  const userSchema = yup.object().shape({
    firstName:yup.string().required("required"),
    lastName:yup.string().required("required"),
    email:yup.string().email("invalid email").required("required"),
    phoneNumber:yup.string().matches(phoneNumberRegEx,"Phone number is not valid").required("required"),
    password:yup.string().required("required")
  })

  return (
    <Box m="20px">

    <Header title="CREATE USER" subtitle="Create a New User"></Header> 
    <Typography variant='h3'>{errorMessage}</Typography>   

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
            <FormGroup >

            <FormControlLabel control={<Checkbox 
            checked={values.admin}  
            onChange={handleChange}
            name="admin"
            />} label="Admin"></FormControlLabel>
            </FormGroup>
            
            <Box display="flex" justifyContent="start"  sx={{flexDirection:"column"}} >
            
            

            {/*<InputLabel id="demo-simple-select-label" sx={{ marginRight: 1 }}>Group Number :</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.groupNumber}
                label="Group Number"
                onChange={handleChange}
                name="groupNumber"
                variant="standard"
                
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>*/}
          
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
      <Box display="flex" justifyContent=" start" mt="20px">
            <input
            accept=".csv"
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            id="file-input"
          />
          <InputLabel htmlFor="file-input">
            <Button variant="contained" color="secondary" component="span" onClick={handelFileUpload}>
              Upload CSV FILE 
            </Button>
          </InputLabel>
        </Box>


    </Box>
  )
}
export default AddUser;


