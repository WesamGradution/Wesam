import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../Header";
import Papa from "papaparse";
import {
  useGetAdminGroupQuery,
  usePostFormInfoMutation,
  useSignUpUserMutation,
} from "../../../../reduxToolKit/api";
import { useGetGroupInfoQuery } from "../../../../reduxToolKit/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../reduxToolKit/userSlice";

export const AddUser = () => {
  // get the admin group
  const { _id, admin } = useSelector(selectUser);
  console.log("🚀 ~ file: index.jsx:33 ~ AddUser ~ admin:", admin);

  const {
    data: data_group,
    isLoading: isLoading_group,
    isError: isError_group,
  } = useGetAdminGroupQuery(_id);

  const [postFormInfo] = usePostFormInfoMutation();
  const [signUp] = useSignUpUserMutation();
  const [errorMessage, setErrorMessage] = useState();
  const [groupId, setGroupId] = useState([]);
  const fileInputRef = useRef();

  const handelFormSubmit = async (values, { resetForm }) => {
    console.log("🚀 ~ file: index.jsx:11 ~ handelFormSubmit ~ values:", values);

    //postFormInfo(values)
    const result = await signUp(values);

    if (result.error) {
      setErrorMessage(result.error.data.message);
    } else {
      resetForm();
    }
  };

  const handelFileUpload = () => {
    // Get the file from the ref
    const file = fileInputRef.current.files[0];
    //console.log(file)

    // Check if the file exists and is a CSV file
    if (file && file.type === "text/csv") {
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

            // Split the groups value by comma and convert it to an array
            const groupsArray = row.groups.split(",");
            // Add the groupsArray as a property of the row object
            row.groups = groupsArray;

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

              try {
                await userSchema.validate(row);

                signUp(row)
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
              } catch (validationError) {
                // Handle the validation error
                console.error(validationError);
                errors.push(row);
              }
            }
          }

          // Check if there were any errors or duplicates
          if (errors.length > 0) {
            // Send back a response with the status code and the list of errors or duplicates
            console.log({ message: "Duplicate data found", errors });
          } else {
            // Send back a response with the status code and the number of users inserted
            console.log({
              message: "Users inserted successfully",
              count: names.size,
            });
          }
        } else {
          // Handle the parsing errors or empty data
          console.error("Invalid or empty CSV file");
        }
      };

      // Read the file as a text string
      reader.readAsText(file);
    } else {
      // Handle the missing or wrong file type
      console.error("Please select a CSV file");
    }
  };

  const initialValues = {
    admin: false,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    groups: [],
  };

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
    groups: yup.array().of(yup.string()).required("required"),
  });

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User"></Header>
      <Typography variant="h3">{errorMessage}</Typography>

      <Formik
        onSubmit={handelFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4,minmax (0,1fr))"
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  error={!!touched.phoneNumber && errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>

              <Box display="flex" justifyContent="end" mt="30px">
                
                  <InputLabel id="group-select-label" sx={{ marginRight: 2,marginTop:1 }}>
                    Group :
                  </InputLabel>

                  <Select
                    labelId="group-select-label"
                    id="demo-simple-select"
                    value={values.groups}
                    onBlur={handleBlur}
                    name="groups"
                    error={!!touched.groups && errors.groups}
                    helperText={touched.groups && errors.groups}
                    multiple
                    onChange={handleChange}
                    variant="standard"
                  >
                    {data_group &&
                      data_group.map((data) => {
                        return (
                          <MenuItem value={data._id}>{data.title}</MenuItem>
                        );
                      })}
                  </Select>
                
               
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    sx={{ width: 160, height: 35,marginLeft:2 }}
                  >
                    Create New User
                  </Button>
                
              </Box>
            </form>
          );
        }}
      </Formik>
      <Box display="flex" justifyContent=" start" mt="-35px">
        <input
          accept=".csv"
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          id="file-input"
        />
        <InputLabel htmlFor="file-input" sx={{padding:1}} >Upload CSV FILE</InputLabel>
        <Box display="flex" justifyContent=" start" ml="10px">
          <Button
            variant="contained"
            color="secondary"
            component="span"
            sx={{ width: 160, height: 35 }}
            onClick={handelFileUpload}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default AddUser;
